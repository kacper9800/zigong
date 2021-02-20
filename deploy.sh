#!/bin/bash

LC_ALL="en_US.UTF-8";
LANG="en_US.UTF-8";
LANGUAGE="en_US:en";

COLOR_OFF="\033[0m"   # unsets color to term fg color
RED="\033[0;31m"      # red
GREEN="\033[0;32m"    # green
YELLOW="\033[0;33m"   # yellow
MAGENTA="\033[0;35m"  # magenta
CYAN="\033[0;36m"     # cyan

readVarFromEnv() {
     VAR=$(grep -w $1 $2 | xargs)
     IFS="=" read -ra VAR <<< "$VAR"
     echo ${VAR[1]}
}

git pull || exit;

SCRIPT_PATH="$( cd "$( dirname "$0" )" && pwd )";

if [ ! -f ${SCRIPT_PATH}/.env ]; then
    printf "${RED}Cannot find .env for deploy script ...${COLOR_OFF}\n";
    exit;
fi;

DEPLOY_ENV=$(readVarFromEnv DEPLOY_ENV .env);

CURRENT_TIME=`date +"%Y%m%d%H%M%S"`;
RELEASE_NAME=${CURRENT_TIME};

BACKUP_DIRECTORY=${SCRIPT_PATH}/db-backup;
BACKEND_ENV_FILE_PATH=${SCRIPT_PATH}/backend/.env;

NPM_INSTALL_FRONT_OFFICE="false";
NPM_INSTALL_BACKEND="false";

askUserToChooseWhatToDo() {
        printf "\n";
        PS3='Please select what to do: ';
        options=(\
            "build everything with installing dependencies" \
            "build front-office-ssr with installing dependencies" \
            "build backend with installing dependencies and running migrations" \
            "build everything (without installing dependencies)" \
            "build front-office-ssr (without installing dependencies)" \
            "build backend with running migrations (without installing dependencies )" \
            "recreate database with seeders" \
        );
        select opt in "${options[@]}";
        do
            case $opt in
                "build everything with installing dependencies")
                    NPM_INSTALL_FRONT_OFFICE="true";
                    NPM_INSTALL_BACKEND="true";
                    FOLDERS_TO_COMPARE=("backend" "frontend")
                    compareLinesInEnvFiles;
                    buildFrontOfficeSSR;
                    updateBackend;
                    break;
                    ;;
                "build front-office-ssr with installing dependencies")
                    NPM_INSTALL_FRONT_OFFICE="true";
                    FOLDERS_TO_COMPARE=("frontend")
                    compareLinesInEnvFiles;
                    buildFrontOfficeSSR;
                    break;
                    ;;
                "build backend with installing dependencies and running migrations")
                    NPM_INSTALL_BACKEND="true";
                    FOLDERS_TO_COMPARE=("backend")
                    compareLinesInEnvFiles;
                    updateBackend;
                    break;
                    ;;
                "build everything (without installing dependencies)")
                    FOLDERS_TO_COMPARE=("backend" "frontend")
                    compareLinesInEnvFiles;
                    buildFrontOfficeSSR;
                    updateBackend;
                    break;
                    ;;
                "build front-office-ssr (without installing dependencies)")
                    FOLDERS_TO_COMPARE=("frontend")
                    compareLinesInEnvFiles;
                    buildFrontOfficeSSR;
                    break;
                    ;;
              
                "build backend with running migrations (without installing dependencies )")
                    FOLDERS_TO_COMPARE=("backend")
                    compareLinesInEnvFiles;
                    updateBackend;
                    break;
                    ;;
                "recreate database with seeders")
                    if areYouSureToRebuildDB; then
                        dumpDB;
                        recreateDB;
                        runDBMigrations;
                        runDBSeeders;
                        flushRedis;
                    fi
                    break;
                    ;;
                *) echo 'invalid option';;
            esac
        done
}

compareLinesInEnvFiles() {
    for folder in "${FOLDERS_TO_COMPARE[@]}"
    do
        ENV_EXAMPLE_FILE="${SCRIPT_PATH}/${folder}/.env.example";
        ENV_EXAMPLE_PARAMETERS_COUNT=$(cat "${ENV_EXAMPLE_FILE}" | sed '/^\s*#/d;/^\s*$/d' | wc -l);

        ENV_FILE="${SCRIPT_PATH}/${folder}/.env";
        ENV_PARAMETERS_COUNT=$(cat "${ENV_FILE}" | sed '/^\s*#/d;/^\s*$/d' | wc -l);

        if [ ${ENV_PARAMETERS_COUNT} != ${ENV_EXAMPLE_PARAMETERS_COUNT} ]; then
            printf "\n${MAGENTA}[${folder}]${COLOR_OFF} ${RED}The number of parameters in the .env/.env.example files does not match!!${COLOR_OFF}\n";
            exit 1;
        fi;
    done
}


buildFrontOfficeSSR() {
    printf "${MAGENTA}Building front office SSR ...${COLOR_OFF}\n";
    cd ${SCRIPT_PATH}/frontend;

    if [ ! -f ${SCRIPT_PATH}/frontend/.env ]; then
        cp .env.example .env;
        nano .env;
    fi;

    if [ "${NPM_INSTALL_FRONT_OFFICE}" == "true" ]; then
        npm install;
    fi

    mkdir -p ${SCRIPT_PATH}/frontend/releases/${RELEASE_NAME};
    sed -i "/export default {/a buildDir: 'releases/${RELEASE_NAME}'," nuxt.config.js;
    npm run build || exitAfterBuildFrontOfficeSSRFailed;

    cd ${SCRIPT_PATH}/frontend/releases;
    ls -dt */ | tail -n +3 | xargs rm -rf;

    cd ${SCRIPT_PATH}/frontend;

    if [[ ! -L "./.nuxt" && -d "./.nuxt" ]]
    then
        rm -rf ./.nuxt;
    fi

    ln -nfs ./releases/${RELEASE_NAME} ./.nuxt;

    git checkout nuxt.config.js;

    pm2 reload ZgccApp;
}

exitAfterBuildFrontOfficeSSRFailed() {
    cd ${SCRIPT_PATH}/frontend;
    git checkout nuxt.config.js;

    printf "${RED}Building front office SSR failed!${COLOR_OFF}\n";

    exit;
}

areYouSureToUpdateDB() {
    while true; do
        read -r -p "${1:-Are you sure to update DB? [Yes/No]} " response
        case $response in
            [yY][eE][sS])
                return 0;
                ;;
            [nN][oO]|[nN])
                return 1;
                ;;
            *) echo 'invalid option';;
        esac
    done
}

areYouSureToRebuildDB() {
    while true; do
        read -r -p "${1:-Are you sure to rebuild DB (it will remove all current data)? Check twice! [ReBUILD/No]} " response
        case $response in
            "ReBUILD")
                return 0;
                ;;
            [nN][oO]|[nN])
                return 1;
                ;;
            *) echo 'invalid option';;
        esac
    done
}

recreateDB() {
    printf "${CYAN}Rebuilding database ...${COLOR_OFF}\n";
    cd ${SCRIPT_PATH}/backend;
    ./node_modules/.bin/sequelize db:drop;
    ./node_modules/.bin/sequelize db:create;
}

dumpDB() {
    printf "${CYAN}Dumping database ...${COLOR_OFF}\n";
    cd ${SCRIPT_PATH}/backend;

    if [ ! -f ${SCRIPT_PATH}/backend/.env ]; then
        printf "${RED}Cannot find .env for deploy script ...${COLOR_OFF}\n";
        exit;
    fi;

    mkdir -p ../db-backup;

    DATABASE_URL=$(readVarFromEnv DATABASE_URL .env);
    DB_PATTERN='(.*)\:\/\/(.*)\:(.*)@localhost\:([0-9]+)\/(.*)'

    [[ "${DATABASE_URL}" =~ ${DB_PATTERN} ]]
    DB_USER="${BASH_REMATCH[2]}";
    DB_PASS="${BASH_REMATCH[3]}";
    DB_PORT="${BASH_REMATCH[4]}";
    DB_NAME="${BASH_REMATCH[5]}";

    if [ "${DEPLOY_ENV}" == "dev" ]; then
        docker-compose -f docker-compose.prod.yml exec mysql \
            mysqldump -u ${DB_USER} --password=${DB_PASS} \
            ${DB_NAME} | gzip -c > ../db-backup/backup-${DB_NAME}-${CURRENT_TIME}.sql.gz;
    elif [ "${DEPLOY_ENV}" == "prod" ]; then
        mysqldump -u ${DB_USER} --password=${DB_PASS} --port=${DB_PORT}\
            ${DB_NAME} | gzip -c > ../db-backup/backup-${DB_NAME}-${CURRENT_TIME}.sql.gz;
    fi

    removeOldBackups;
}

removeOldBackups() {
    printf "${CYAN}Removing old database dumps ...${COLOR_OFF}\n";
    cd ${SCRIPT_PATH};

    if [ ! -f ${SCRIPT_PATH}/.env ]; then
        printf "${RED}Cannot find GLOBAL .env ...${COLOR_OFF}\n";
        exit;
    fi;

    BACKUP_DAYS_BEFORE_REMOVING=$(readVarFromEnv BACKUP_DAYS_BEFORE_REMOVING .env);

    if [ -z "${BACKUP_DAYS_BEFORE_REMOVING}" ]; then
        BACKUP_DAYS_BEFORE_REMOVING=60;
    fi;

    X_DAYS_BEFORE_TIMESTAMP=`date -d "-$BACKUP_DAYS_BEFORE_REMOVING days" "+%s"`;
    X_DAYS_BEFORE_TIMESTAMP=$(printf '%d' "${X_DAYS_BEFORE_TIMESTAMP}" 2>/dev/null || :;);

    for file in "${BACKUP_DIRECTORY}"/*
    do
        FILE_BASENAME="$(basename "$file")";

        if [ ! -f ${BACKEND_ENV_FILE_PATH} ]; then
            printf "${RED}Cannot find BACKEND .env ...${COLOR_OFF}\n";
            exit;
        fi;

        DATABASE_URL=$(readVarFromEnv DATABASE_URL ${BACKEND_ENV_FILE_PATH});
        DB_PATTERN='(.*)\:\/\/(.*)\:(.*)@(localhost|127.0.0.1)\:([0-9]+)\/(.*)';

        [[ "${DATABASE_URL}" =~ ${DB_PATTERN} ]]
        DB_NAME="${BASH_REMATCH[6]}";

        FILENAME_PATTERN="backup-${DB_NAME}-(.*)\.sql(\.gz)?";
        [[ "${FILE_BASENAME}" =~ ${FILENAME_PATTERN} ]]
        FILE_CREATION_DATE="${BASH_REMATCH[1]}";

        DATETIME_PATTER="([0-9]{4})([0-9]{2})([0-9]{2})([0-9]{2})([0-9]{2})([0-9]{2})";
        [[ "${FILE_CREATION_DATE}" =~ $DATETIME_PATTER ]]
        DATETIME_FORMAT="${BASH_REMATCH[1]}-${BASH_REMATCH[2]}-${BASH_REMATCH[3]} ${BASH_REMATCH[4]}:${BASH_REMATCH[5]}:${BASH_REMATCH[6]}";

        FILE_TIMESTAMP=$(date -d "${DATETIME_FORMAT}" "+%s" 2>/dev/null);
        FILE_TIMESTAMP=$(printf '%d' "${FILE_TIMESTAMP}" 2>/dev/null || :;);

        if [ "${X_DAYS_BEFORE_TIMESTAMP}" -gt "0" ] && [ "${FILE_TIMESTAMP}" -gt "0" ]; then
            if [ "${X_DAYS_BEFORE_TIMESTAMP}" -ge "${FILE_TIMESTAMP}" ]; then
                printf "${CYAN}Deleting $FILE_BASENAME ...${COLOR_OFF}";
                rm ${file} && printf " ${GREEN}Deleted!${COLOR_OFF}\n";
            fi
        fi
    done
}

runDBMigrations() {
    printf "${CYAN}Running migrations ...${COLOR_OFF}\n";
    cd ${SCRIPT_PATH}/backend;
    npm run migrate;
}

runDBSeeders() {
    printf "${CYAN}Running seeders ...${COLOR_OFF}\n";
    cd ${SCRIPT_PATH}/backend;
    npm run seed;
}

flushRedis() {
    printf "${CYAN}Clearing redis ...${COLOR_OFF}\n";
    cd ${SCRIPT_PATH}/backend;

    if [ ! -f ${SCRIPT_PATH}/backend/.env ]; then
        printf "${RED}Cannot find .env for deploy script ...${COLOR_OFF}\n";
        exit;
    fi;

    REDIS_PASS=$(readVarFromEnv REDIS_PASS .env);

    if [ "${DEPLOY_ENV}" == "dev" ]; then
        if [ "${REDIS_PASS}" != "" ]; then
            docker-compose -f docker-compose.prod.yml exec redis redis-cli -a ${REDIS_PASS} FLUSHALL;
        else
            docker-compose -f docker-compose.prod.yml exec redis redis-cli FLUSHALL;
        fi
    elif [ "${DEPLOY_ENV}" == "prod" ]; then
        redis-cli -a ${REDIS_PASS} FLUSHALL;
    fi
}

updateBackend() {
    printf "${MAGENTA}Updating backend ...${COLOR_OFF}\n";
    cd ${SCRIPT_PATH}/backend;

    if [ "${NPM_INSTALL_BACKEND}" == "true" ]; then
        npm install;
    fi

    if [ ! -f ${SCRIPT_PATH}/backend/.env ]; then
        cp .env.example .env;
        nano .env;
    fi;

    dumpDB;
    runDBMigrations;
    flushRedis;

    pm2 reload ZgccApp;
}

createReleaseAndRemoveRedundantBackOffice() {
    mkdir -p ${SCRIPT_PATH}/frontend/releases/back-dist/${RELEASE_NAME};

    cd ${SCRIPT_PATH}/frontend/releases/back-dist;
    ls -dt */ | tail -n +3 | xargs rm -rf;
}

copyDistAndCreateSymlinksBackOffice() {
    cp -r ${SCRIPT_PATH}/frontend-cms/dist/* ${SCRIPT_PATH}/frontend/releases/back-dist/${RELEASE_NAME};

    ln -nfs ${SCRIPT_PATH}/frontend/releases/back-dist/${RELEASE_NAME} ${SCRIPT_PATH}/frontend/public-admin;
}

askUserToChooseWhatToDo;