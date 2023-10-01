<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;

class FCMService
{ 
    public static function send($token, $notification)
    {
        $fcm_token ='AAAAlSWK_0o:APA91bFWnkEm-rAoes7WDZg_PiW04v-G8mUuuRqfCXuFeUXZGyTDQRmvDdEM_Xqw-2k7TI6XRaPZqA9Web95mZwKEONRY_gMr4uNvh2vYJK3Hk_0V3jx4HEO-uQLmmJUhNjOLS15naQH';

        Http::withoutVerifying()->withHeaders([
            'Authorization' => 'key=' . $fcm_token,
            'Content-Type' => 'application/json',
        ])->post(
            'https://fcm.googleapis.com/fcm/send',
            [
                'to' => $token,
                'notification' => $notification,
            ]
        );
    }
}