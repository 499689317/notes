rs.initiate({
	"_id": "zhiyule",
	"members": [
		{
		"_id": 1,
		"host": "172.17.248.47:3717",
		"priority": 1
		},
		{
		"_id": 2,
		"host": "172.17.248.48:3718",
		"priority": 1
		},
		{
		"_id": 3,
		"host": "172.17.248.46:3719",
		"priority": 1
		}
	]
});


db.createUser({
	user: "zhiyule",
	pwd: "Fenliemofang2018",
	roles: [
		{role: "readWrite", db: "gate"}
	]
});

db.auth("root", "Fenliemofang2018");


./mongorestore -h 127.0.0.1:3717 -d game /dump/game/

db.player.insert({rid: 1})


{
	"env": {
		"1": "production",
		"2": "test"
	},
	"http": {
		"host": "101.201.234.73",
		"port": 7000
	},
	"db": {
		"name" : "log",
		"username": "zhiyule",
		"password": "Fenliemofang2018",
		"setname": "mgset-4843727",
		"opt": {
			"poolSize": 10,
			"connectTimeoutMS": 30000,
            "socketTimeoutMS": 500,
            "w": 1,
            "wtimeout": 500,
            "j": true
		},
		"rs0": {
			"host" : "101.201.234.73",
			"port" : 3717
		},
		"rs1": {
			"host" : "dds-2zec1e43dc2f61c41.mongodb.rds.aliyuncs.com",
			"port" : 3717
		},
		"rs2": {
			"host" : "dds-2zec1e43dc2f61c42.mongodb.rds.aliyuncs.com",
			"port" : 3717
		}
	},

	"dev_http": {
		"host": "192.168.1.114",
		"port": 7000
	},
	"dev_db": {
		"name": "log",
		"opt": {},
		"rs": {
			"host" : "192.168.1.114",
			"port" : 27017
		}
	},

	"test_http": {
		"host": "39.106.101.80",
		"port": 7000
	},
	"test_db": {
		"name": "log",
		"opt": {},
		"rs": {
			"host" : "39.106.101.80",
			"port" : 27017
		}
	}
}










