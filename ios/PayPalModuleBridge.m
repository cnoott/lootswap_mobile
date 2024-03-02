//
//  PayPalModuleBridge.m
//  lootswap_mobile
//
//  Created by Liam Amadio on 2/29/24.
//

#import <React/RCTBridgeModule.h>
#import <React/RCTViewManager.h>
#import <React/RCTConvert.h>
#import <Foundation/Foundation.h>

#import <React/RCTBridgeModule.h>

// This macro tells React Native that there is a module to be exported.
// The name here is used to call it from JavaScript.
@interface RCT_EXTERN_MODULE(PayPalModule, NSObject)

RCT_EXTERN_METHOD(setupPayPal:(NSString *)clientID)
RCT_EXTERN_METHOD(startPayPalCheckout:(NSString *)orderID resolver:(RCTPromiseResolveBlock)resolver rejecter:(RCTPromiseRejectBlock)rejecter)

@end
