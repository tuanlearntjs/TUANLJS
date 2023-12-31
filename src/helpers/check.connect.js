'use strict';

// Đếm số kết nối
const mongoose = require('mongoose')
const os = require('os')
const process = require('process');
const numCores = 1;
const _SECONDS = 50000;
let printed = false;


const countConnect = () => {
    const numConnection = mongoose.connection.length
    console.log(`Number of connection:: ${numConnection}`)
    return numConnection;
}

// kiểm tra quá tải , check overload
const checkOverload = () => {
    setInterval( () => {
        const numConnection = mongoose.connection.length
        const numCore = os.cpus().length;
        const memoryUsage = process.memoryUsage().rss;
        // Ví dụ tối đa số lượt truy cập của core
        const maxConnections = numCores * 5;
        
        if (!printed) {
            console.log(`Active connections: ${numConnection}`)
            console.log(`Memory usage: ${memoryUsage / 1024 / 1024} MB`);
            printed = true;
        }

        if(numConnection > maxConnections) {
            console.log(`Connection overload detected!`)
        }
    })
};

module.exports = {
    countConnect,
    checkOverload
}