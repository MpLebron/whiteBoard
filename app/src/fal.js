/**
 * @name: fal
 * @description: TODO
 * @author: Lingkai Shi
 * @date: 8/8/2024 9:55 PM
 * @version: 1.0
 */
import * as fal from "@fal-ai/serverless-client";

fal.config({
    credentials: "c8352276-dda1-4c6f-ae7c-3ee514b0058e:e860a1ecb768ff98001388e714b5e281",
});

const connection = fal.realtime.connect("fal-ai/fast-lcm-diffusion", {
    onResult: (result) => {
        console.log(result);
        console.log('data:image/png;base64,' + transformUint8ArrayToBase64(result.images[0].content))
    },
    onError: (error) => {
        console.error(error);
    },
});

export const transformUint8ArrayToBase64 = (array) => {
    var binary = "";
    for (var len = array.byteLength, i = 0; i < len; i++) {
        binary += String.fromCharCode(array[i]);
    }
    return window.btoa(binary).replace(/=/g, "");
}

function randomSessionId() {
    let ua = new Uint8Array(20);
    new DataView(ua.buffer).setUint32(0, Math.floor(+new Date() / 1000));
    crypto.getRandomValues(ua.subarray(4, 20));
    return (
        "1." +
        transformUint8ArrayToBase64(ua)
            .replaceAll("+", "-")
            .replaceAll("/", "_")
    );
}

export const sendImg = (desc, imgUrl) => {
    connection.send({
        prompt: desc,
        sync_mode: true,
        image_url: imgUrl,
    });

}