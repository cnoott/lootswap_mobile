//
//  PayPalModule.swift
//  lootswap_mobile
//
//  Created by Liam Amadio on 2/29/24.
//
import Foundation
import UIKit
import CorePayments
import PayPalNativePayments
import React

@objc(PayPalModule)
class PayPalModule: RCTEventEmitter {
  // Make sure you have this static function
  override static func moduleName() -> String! {
    return "PayPalModule"
  }
  
  override static func requiresMainQueueSetup() -> Bool {
    return false
  }
  
  var paypalNativeClient: PayPalNativeCheckoutClient?
  
  @objc func setupPayPal(_ clientID: String) {
    let config = CoreConfig(clientID: clientID, environment: .sandbox) // Change to .live for production
    paypalNativeClient = PayPalNativeCheckoutClient(config: config)
  }
  
  override func supportedEvents() -> [String]! {
      return ["onPayPalCheckoutFinished"]
  }
  
  func emitCheckoutEvent(withResult result: Any) {
    sendEvent(withName: "onPayPalCheckoutFinished", body: result)
  }

  @objc func startPayPalCheckout(_ orderID: String, resolver: @escaping RCTPromiseResolveBlock, rejecter: @escaping RCTPromiseRejectBlock) {
      guard let paypalNativeClient = paypalNativeClient else {
          // If the PayPal client is not initialized, reject the promise
          rejecter("E_PAYPAL_NOT_INITIALIZED", "PayPal client is not initialized", nil)
          return
      }

      let request = PayPalNativeCheckoutRequest(orderID: orderID)
      paypalNativeClient.delegate = self // Set the delegate

      // Assuming the start method can be called and handle asynchronously
      Task {
          do {
              try await paypalNativeClient.start(request: request)
              resolver("Success") // You might want to pass a more meaningful result based on your application's needs
          } catch {
              // If an error occurs, reject the promise
              rejecter("E_PAYPAL_CHECKOUT_FAILED", "Failed to start PayPal checkout: \(error.localizedDescription)", error)
          }
      }
  }
}

extension PayPalModule: PayPalNativeCheckoutDelegate {

  func paypal(_ payPalClient: PayPalNativePayments.PayPalNativeCheckoutClient, didFinishWithResult result: PayPalNativePayments.PayPalNativeCheckoutResult) {
      print(result)
      emitCheckoutEvent(withResult: ["status": "success", "orderID": result.orderID])
  }
  
  
  
    
    func paypal(_ payPalClient: PayPalNativeCheckoutClient, didFinishWithError error: CoreSDKError) {
        // Handle error
      emitCheckoutEvent(withResult: ["status": "error"])

    }
    
    func paypalDidCancel(_ payPalClient: PayPalNativeCheckoutClient) {
        // Handle cancellation
    }
    
    func paypalWillStart(_ payPalClient: PayPalNativeCheckoutClient) {
        // Handle the start of the payment process, such as showing a loading indicator
    }
}
