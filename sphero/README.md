# Sphero AWS IoT Connector

A connector to let AWS IoT control a [Sphero device](http://www.sphero.com). It works by running this connector on a computer with Bluetooth and Internet access. The connector runs on the computer and reacts to changes sent through desired state by sending commands to the device using Bluetooth and setting reported state when done.

The following properties are allowed:

- color (string)
- direction (number: 0-359)
- speed (number: 0-255)

## Preparations

Before you can run this you need to do some preparation.

- Create a new thing in AWS IoT
- Download the certifications for that thing into the following files
	- ../.cert/certificate.pem.crt
	- ../.cert/private.pem.key
	- ../.cert/public.pem.key
- Create and attach a policy to the thing that looks like this
	```{
	   "Version": "2012-10-17",
	   "Statement": [
	      {
	         "Action": "iot:Connect",
	         "Effect": "Allow",
	         "Resource": "arn:aws:iot:eu-west-1:<accountid>:client/<thingname>"
	      },
	      {
	         "Action": "iot:Subscribe",
	         "Effect": "Allow",
	         "Resource": "arn:aws:iot:eu-west-1:<accountid>:topicfilter/$aws/things/${iot:ClientId}/*"
	      },
	      {
	         "Action": [
	            "iot:Receive",
	            "iot:Publish"
	         ],
	         "Effect": "Allow",
	         "Resource": "arn:aws:iot:eu-west-1:<accountid>:topic/$aws/things/${iot:ClientId}/*"
	      }
	   ]
	}```

## Usage

First `yarn install` the dependencies and run `yarn start` with a couple of paramaters:
 
 - `--endpoint <endpoint for aws iot>`
 - `--thingName <thing name for the thing you created>`
 - `--uuid <bluetooth uuid for the Sphero>`

Don't forget the extra `--` so you should run `yarn start -- --endpoint ...`
