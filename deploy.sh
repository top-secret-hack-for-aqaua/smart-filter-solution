#!/bin/bash

# Скрипт для развертывания всех подов и ресурсов в Kubernetes

set -e

echo "Применение манифестов Kafka..."
kubectl apply -f kafka-deployment.yaml
kubectl apply -f kafka-service.yaml

echo "Ожидание запуска Kafka..."
kubectl wait --for=condition=ready pod -l app=kafka --timeout=300s || {
  echo "Ошибка: Kafka поды не запустились вовремя."
  kubectl logs -l app=kafka
  exit 1
}

echo "Создание PersistentVolumeClaim для Kaniko..."
kubectl apply -f workspace-pvc.yaml

echo "Запуск подов Kaniko для сборки образов..."
kubectl apply -f kaniko/producer-kaniko.yaml
kubectl apply -f kaniko/consumer-kaniko.yaml

echo "Ожидание завершения сборки образов..."
kubectl wait --for=condition=complete pod/kaniko-producer --timeout=300s || {
  echo "Ошибка: Время ожидания завершения сборки kaniko-producer истекло."
  kubectl logs kaniko-producer
  exit 1
}
kubectl wait --for=condition=complete pod/kaniko-consumer --timeout=300s || {
  echo "Ошибка: Время ожидания завершения сборки kaniko-consumer истекло."
  kubectl logs kaniko-consumer
  exit 1
}

echo "Удаление подов Kaniko..."
kubectl delete pod kaniko-producer
kubectl delete pod kaniko-consumer

echo "Запуск деплойментов для producer и consumer..."
kubectl apply -f producer-deployment.yaml
kubectl apply -f consumer-deployment.yaml

echo "Ожидание запуска producer и consumer..."
kubectl wait --for=condition=ready pod -l app=producer --timeout=300s || {
  echo "Ошибка: Producer поды не запустились вовремя."
  kubectl logs -l app=producer
  exit 1
}
kubectl wait --for=condition=ready pod -l app=consumer --timeout=300s || {
  echo "Ошибка: Consumer поды не запустились вовремя."
  kubectl logs -l app=consumer
  exit 1
}

echo "Все поды и ресурсы успешно развернуты."