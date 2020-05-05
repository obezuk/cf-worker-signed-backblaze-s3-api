import { AwsClient } from 'aws4fetch'

const aws = new AwsClient({
    accessKeyId: BACKBLAZE_ACCESS_KEY_ID,
    secretAccessKey: BACKBLZE_SECRET_ACCESS_KEY
})

addEventListener('fetch', event => {
    event.respondWith(handleRequest(event))
});

async function handleRequest(event) {
    var request = event.request;
    var url = new URL(event.request.url);
    url.hostname = BACKBLAZE_BUCKET_NAME + '.' + BACKBLAZE_ENDPOINT;

    var headers = new Headers();

    if (event.request.headers.has('Range')) {
        headers.set('Range', event.request.headers.get('Range'));
    }

    var signedRequest = await aws.sign(url, {
        "method": event.request.method,
        "headers": headers,
        "aws": {
            "allHeaders": true
        }
    });

    return await fetch(signedRequest, {
        "cf": {
            "cacheTtl": 300,
            "cacheEverything": true
        }
    })

}