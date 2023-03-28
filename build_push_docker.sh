docker-compose -f docker-compose.yml build

docker push ghcr.io/lnls-sirius/cod-mon-backend:1.0.0
docker push ghcr.io/lnls-sirius/cod-mon-frontend:1.0.0
