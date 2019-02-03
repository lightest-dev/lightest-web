DATE="$(date -u +%FT%T)"
echo $DATE
set -v
npm install
ng build --prod
docker build \
--build-arg version=$VERSION \
--build-arg vcs_ref=$TRAVIS_COMMIT \
--build-arg build_date=$DATE \
-t deadsith/lightest-web:latest -t deadsith/lightest-web:$VERSION .
set +v