#!/bin/bash

USERNAME=$1
PASSWORD=$2
CLIENT_ID=$3

# Do an initial login
# It will come back wtih a challenge response
AUTH_CHALLENGE_SESSION=`aws cognito-idp initiate-auth \
--auth-flow USER_PASSWORD_AUTH \
--auth-parameters "USERNAME=$USERNAME,PASSWORD=$PASSWORD" \
--client-id $CLIENT_ID`

echo $USERNAME
echo $PASSWORD
echo $CLIENT_ID
echo "Logged in full response "
echo $AUTH_CHALLENGE_SESSION
