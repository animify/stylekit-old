function RUN_TESTS {
    cd packages/site
    rm -rf build/*
    webpack --config webpack.prod.config.client.js
}

RUN_TESTS
echo -e "\e[37m\e[42m Build completed.\033[0m"
