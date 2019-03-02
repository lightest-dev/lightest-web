FROM nginx:alpine
ARG vcs_ref
ARG build_date
ARG version

LABEL org.label-schema.maintainer="lllen" \
    org.label-schema.url="https://github.com/lightest-dev/lightest-web" \
    org.label-schema.name="Lightest web part" \
    org.label-schema.license="Apache-2.0" \
    org.label-schema.version="$version" \
    org.label-schema.vcs-url="https://github.com/lightest-dev/lightest-web" \
    org.label-schema.vcs-ref="$vcs_ref" \
    org.label-schema.build-date="$build_date" \
    org.label-schema.schema-version="1.0" \
    org.label-schema.dockerfile="/Dockerfile"

COPY nginx.conf /etc/nginx/nginx.conf

WORKDIR /usr/share/nginx/html
COPY dist/lightest-web/ .