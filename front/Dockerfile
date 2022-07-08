# dockerHubから持ってくるImageの指定
# FROM purewest/react-node:1.0.3
FROM node:16.15.0-alpine3.15

# 使用するnodeのバージョンの指定
ENV NODE_VERSION 16.15.0
# docker内に入った時の初期パスの指定
WORKDIR /front
# ローカル側のファイルをdocker内にコピーする
COPY ./React /front
# COPY ./scripts /front
# コンテナの使用ポート指定
EXPOSE 3000
# コンテナが勝手に終了してしまわないようにする設定
ENV CI=true

CMD npm install && npm start