'use strict';

// ����ģ��
var http = require('http');
var fs = require('fs');
var path = require('path');
var cheerio = require('cheerio');

// �����URL��Ϣ
var opt = {
    hostname: 'movie.douban.com',
    path: '/top250',
    port: 80
};

// ����http get����
http.get(opt, function(res) {
    var html = ''; // ����ץȡ����HTMLԴ��
    var movies = [];  // �������HTML������ݣ���������Ҫ�ĵ�Ӱ��Ϣ

    // ǰ��˵��
    // res �� Class: http.IncomingMessage ��һ��ʵ��
    // �� http.IncomingMessage ʵ���� stream.Readable �ӿ�
    // ���� http.IncomingMessage Ҳ�� stream.Readable ���¼��ͷ���
    // ���� Event: 'data', Event: 'end', readable.setEncoding() ��

    // ���ñ���
    res.setEncoding('utf-8');

    // ץȡҳ������
    res.on('data', function(chunk) {
        html += chunk;
    });

    res.on('end', function() {
        // ʹ�� cheerio ����ץȡ����HTML����
        // Ȼ��Ϳ���ʹ�� jQuery �ķ�����
        // �����ȡĳ��class��$('.className')
        // �������ܻ�ȡ�������class����������
        var $ = cheerio.load(html);

        // ����ҳ��
        // ÿ����Ӱ���� item class ��
        $('.item').each(function() {
            // ��ȡͼƬ����
            var picUrl = $('.pic img', this).attr('src');
            var movie = {
                title: $('.title', this).text(), // ��ȡ��Ӱ����
                star: $('.info .star em', this).text(), // ��ȡ��Ӱ����
                link: $('a', this).attr('href'), // ��ȡ��Ӱ����ҳ����
                picUrl: /^http/.test(picUrl) ? picUrl : 'http://localhost:3000/' + picUrl // ��װ��ӰͼƬ����
            };

            // �����е�Ӱ����һ����������
            movies.push(movie);
            // ����ͼƬ
            downloadImg('img/', movie.picUrl);
        });

        // ����ץȡ���ĵ�Ӱ����
        saveData('data/data.json', movies);
    });
}).on('error', function(err) {
    console.log(err);
});


/**
 * �������ݵ�����
 *
 * @param {string} path �������ݵ��ļ�
 * @param {array} movies ��Ӱ��Ϣ����
 */
function saveData(path, movies) {
    // ���� fs.writeFile �����������ݵ�����
    fs.writeFile(path, JSON.stringify(movies, null, 4), function(err) {
        if (err) {
            return console.log(err);
        }
        console.log('Data saved');
    });
}

/**
 * ����ͼƬ
 *
 * @param {string} imgDir ���ͼƬ���ļ���
 * @param {string} url ͼƬ��URL��ַ
 */
function downloadImg(imgDir, url) {
    http.get(url, function(res) {
        var data = '';

        res.setEncoding('binary');

        res.on('data', function(chunk) {
            data += chunk;
        });

        res.on('end', function() {
            // ���� fs.writeFile ��������ͼƬ������
            fs.writeFile(imgDir + path.basename(url), data, 'binary', function(err) {
                if (err) {
                    return console.log(err);
                }
                console.log('Image downloaded: ', path.basename(url));
            });
        });
    }).on('error', function(err) {
        console.log(err);
    });
}