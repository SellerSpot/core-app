# ---- Base Node ----
FROM alpine:3.12.3 AS base
# set work dir
WORKDIR /app
# install node
RUN apk add --no-cache nodejs npm
# copy project file
COPY . .

# ---- Dependencies ----
FROM base AS dependencies
# install node packages
RUN npm install --only=production
# copy production node_modules aside
RUN cp -R node_modules prod_node_modules
# install ALL node_modules, including 'devDependencies'
RUN npm install
# install ALL node_modules, including 'devDependencies'
RUN npm run build

# ---- Release ----
FROM base AS release
# copy production node_modules
COPY --from=dependencies /app/prod_node_modules ./node_modules
# copy app sources
COPY --from=dependencies /app/dist ./dist
# copy app sources
COPY --from=dependencies /app/server ./server
# expose port and define CMD
EXPOSE 6000
# executable
CMD ["node", "server"]
