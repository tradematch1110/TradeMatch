import os
# open docker desktop app
# mark the NODE_ENV=production  api FB server
# unmark the REACT_APP_API=http://localhost:5000  in devest-react-app


try:
    os.system(r'docker-compose -f docker-compose.prod.yml build')
    os.system(r'aws lightsail push-container-image --region eu-central-1 --service-name tradematch --label api --image tradematch_api:latest')
    os.system(r'aws lightsail push-container-image --region eu-central-1 --service-name tradematch --label web --image tradematch_web:latest')
    print(os.getcwd())
except NameError:
    print(NameError)

print("deploy successfully!")
