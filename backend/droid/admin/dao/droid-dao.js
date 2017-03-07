const aws = require("aws-sdk")

const ddb = new aws.DynamoDB.DocumentClient()

module.exports.create = (droid) => {
	console.log("create", droid)
	const params = {
		TableName: process.env.DROID_TABLE,
		Item: droid
	}
	return new Promise((resolve, reject) => {
		ddb.put(params, (error) => {
			if (error) {
				reject(new Error(error))
			} else {
				resolve(droid)
			}
		})
	})
}

module.exports.delete = (droidId) => {
	console.log("delete", droidId)
	const params = {
		TableName: process.env.DROID_TABLE,
		Key: {
			id: droidId
		}
	}
	return new Promise((resolve, reject) => {
		ddb.delete(params, (error) => {
			if (error) {
				reject(new Error(error))
			} else {
				resolve({})
			}
		})
	})
}

module.exports.findById = (droidId) => {
	console.log("findById", droidId)
	const params = {
		TableName: process.env.DROID_TABLE,
		Key: {
			id: droidId
		}
	}
	return new Promise((resolve, reject) => {
		ddb.get(params, (error, result) => {
			if (error) {
				reject(new Error(error))
			} else {
				resolve(result.Item)
			}
		})
	})
}

module.exports.findAll = () => {
	console.log("findAll")
	const params = {
		TableName: process.env.DROID_TABLE
	}
	return new Promise((resolve, reject) => {
		ddb.scan(params, (error, result) => {
			if (error) {
				reject(new Error(error))
			} else {
				resolve(result.Items)
			}
		})
	})
}

module.exports.update = (droid) => {
	console.log("update", droid)
	const params = {
		TableName: process.env.DROID_TABLE,
		Key: {
			id: droid.id
		},
		ExpressionAttributeNames: {
			"#droid_name": "name",
			"#droid_description": "description"
		},
		ExpressionAttributeValues: {
			":name": droid.name,
			":description": droid.description,
			":updatedAt": droid.updatedAt,
		},
		UpdateExpression: "SET #droid_name = :name, #droid_description = :description, updatedAt = :updatedAt",
		ReturnValues: "ALL_NEW",
	}
	return new Promise((resolve, reject) => {
		ddb.update(params, (error, result) => {
			if (error) {
				reject(new Error(error))
			} else {
				resolve(result.Attributes)
			}
		})
	})
}
