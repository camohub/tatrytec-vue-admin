#!/bin/bash

www_dir=/var/www
www_new_app_dir=$www_dir/deploy-new-vue.tatrytec.eu
www_old_app_dir=$www_dir/deploy-old-vue.tatrytec.eu


# git clone is in the pipeline gonfiguration
#git clone https://github.com/camohub/tatrytec-vue-admin.git $www_new_app_dir
cd $www_new_app_dir
echo "---------------------------------------------------"
echo " git clone done "
echo "---------------------------------------------------"

chmod -R 770 $www_new_app_dir/
echo "---------------------------------------------------"
echo " chmod -R 770 done "
echo "---------------------------------------------------"

sed -i 's/http:\/\/localhost:8000/https:\/\/vue.tatrytec.eu/' $www_new_app_dir/src/router/apiRoutes.js

npm install
npm run build
echo "---------------------------------------------------"
echo " npm build done "
echo "---------------------------------------------------"

find $www_new_app_dir -type d -exec chmod 775 {} \;  # chmod for directories
echo "---------------------------------------------------"
echo " chmod f + chmod d dome "
echo "---------------------------------------------------"

mv $www_dir/vue.tatrytec.eu $www_old_app_dir
echo "---------------------------------------------------"
echo " old app folder rename done "
echo "---------------------------------------------------"

mv $www_new_app_dir $www_dir/vue.tatrytec.eu
echo "---------------------------------------------------"
echo " new app folder rename done "
echo "---------------------------------------------------"

cd $www_dir/vue.tatrytec.eu

rm -rf $www_old_app_dir
echo "---------------------------------------------------"
echo " DEPLOY IS DONE. CHECK ERROR MESSAGES. "
echo "---------------------------------------------------"

