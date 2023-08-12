#!/bin/bash

echo "Acessando a pasta 'allure-results' (local)"

cd cypress/reports/allure-results/

echo "Criando o arquivo categories.json para adicionar informações ao campo 'CATEGORIAS' do relatório"

cat > categories.json << EOF
[
    {
        "name": "Testes reprovados",
        "matchedStatuses": [
            "failed"
        ]
    },
    {
        "name": "Testes aprovados",
        "matchedStatuses": [
            "passed"
        ]
    },
    {
        "name": "Testes que foram pulados",
        "matchedStatuses": [
            "skipped"
        ]
    }
]
EOF