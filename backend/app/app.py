from crypt import methods
from email.policy import default
from enum import unique
import imp
import os
from distutils.log import debug
import flask
import flask_sqlalchemy
import flask_praetorian
import flask_cors

# インスタンスの作成
db = flask_sqlalchemy.SQLAlchemy()
guard = flask_praetorian.Praetorian()
cors = flask_cors.CORS()


# データベースのモデル 内容を定義 カラム名の定義
# .Columnでデータベースのカラムを定義している
class User(db.Model):
    # idを整数で、プライマリーキーに指定
    id = db.Column(db.Integer, primary_key=True)
    # usernameのユニーク制約を使用
    username = db.Column(db.Text, unique=True)
    password = db.Column(db.Text)
    roles = db.Column(db.Text)
    is_active = db.Column(db.Boolean, default=True, sever_default='True')

    # デコレータを使用して関数を定義
    @property
    def rolenames(self):
        try:
            return self.roles.split(',')
        except Exception:
            return[]

    @classmethod
    def lookup(cls, username):
        return cls.query.filter_by(username=username).one_or_none()
    
    
    @classmethod
    def identify(cls, id):
        return cls.query.get(id)
    
    
    @property
    def identity(self):
        return self.id
    
    
    def is_valid(self):
        return self.is_active


# flaskアプリの初期化
app = flask.Flask(__name__)
app.debug = True
app.config['SECRET_KEY'] = 'top secret'
app.config['JWT_ACCESS_LIFESPAN'] = {'hours': 24}
app.config['JWT_REFRESH_LIFESPAN'] = {'days': 30}


# アプリ用のflask-praetorianのインスタンスの初期化
guard.init_app(app, User)


# ローカルデータベースの初期化
app.config['SQLALCHEMY_DATABASE_URI'] = f"sqlite:///{os.path.join(os.getcwd(), 'database.db')}"
db.init_app(app)


# api_toolがサンプルアプリと通信できるようにCORSの初期化
cors.init_app(app)


# ユーザーを追加する処理
@app.route('/api/register', methods=['POST'])
def register():
    
    
    req = flask.request.get_json(force=True)
    username = req.get('username', None)
    password = req.get('password', None)
    
    
    with app.app_context():
        db.create_all()
        if db.session.query(User).filter_by(username=username).count() < 1:
            db.session.add(User(
                username=username,
                password=guard.hash_password(password),
                roles='admin'
            ))
        db.session.commit()
    
    user = guard.authenticate(username, password)
    ret = {'access_token': guard.encode_jwt_token(user)}

    return ret,200
    
# ルーティングの設定
@app.route('/api/')
def home():
    return {"Hello": "World"}, 200


# フロントからのリクエストがPOSTだった時の処理
@app.route('/api/login', methods=['POST'])
def login():
    """
     ユーザー認証情報を含むPOSTリクエストを解析し、JWTトークンを発行することで、ユーザーをログインさせる。
    JWT トークンを発行する。
    例::
    $ curl http://localhost:5000/api/login -X POST \.
      -d '{"username": "kobakichi", "password": "strongpassword"}'
    """
    req = flask.request.get_json(force=True)
    username = req.get('username', None)
    password = req.get('password', None)
    user = guard.authenticate(username, password)
    ret = {'access_token': guard.encode_jwt_token(user)}
    return ret, 200


@app.route('/api/refresh', methods=['POST'])
def refresh():
    """
    既存のJWTをリフレッシュし、古いJWTのコピーである新しいJWTを作成する。
    ただし、アクセス期限は更新される。
    例::
    $ curl http://localhost:5000/api/refresh -X GET \.
    -H "Authorization: Bearer<your_token>"
    """
    print("refresh request")
    old_token = request.get_data()
    new_token = guard.refresh_jwt_token(old_token)
    ret = {'access_token': new_token}
    return ret, 200



@app.route('/api/protected')
@flask_praetorian.auth_required
def protected():
    """
    保護されたエンドポイント。auth_required デコレータは、有効な JWT を含むヘッダを要求します。
    を含むヘッダが必要です。
    例::
    $ curl http://localhost:5000/api/protected -X GET \.
    -H "Authorization: Bearer <your_token>".
    """
    return {'message': f'protected endpoint (allowed user {flask_praetorian.current_user().username})'}


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)