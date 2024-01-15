export enum Size {
  Extra_Small = 'esm',
  Small = 'sm',
  Medium = 'md',
  Large = 'lg',
  Full = 'fl',
  Fit_To_Width = 'ftw',
  Custom = 'cst',
  View = 'view',
  ViewSmall = 'viewsmall',
}
export enum Type {
  Primary = 'primary',
  Secondary = 'secondary',
  Message = 'message',
  Grey = 'grey',
  Error = 'error',
  Success = 'success',
  Link = 'link',
  Info = 'info',
  Text = 'text',
  Placeholder = 'placeholder',
  Custom = 'custom',
  View = 'view',
}

export enum FontFamily {
  Regular = 'System85Pro-Regular',
  Medium = 'System85Pro-Medium',
}

export enum API_METHOD {
  Get = 'GET',
  Post = 'POST',
  Delete = 'DELETE',
  Put = 'PUT',
}

export enum Trade_Options {
  TradeAndSell = 'trade-sell',
  TradeOnly = 'trade-only',
  SellOnly = 'sell-only',
}

export enum Who_Pays_Options {
  BuyerPays = 'buyer-pays',
  SellerPays = 'seller-pays',
}

export enum Trade_Status {
  Pending = 'pending',
  Accepted = 'accepted',
  Canceled = 'canceled',
  Declined = 'declined',
}

export enum Order_Status {
  Purchased = 'purchased',
  Shipped = 'shipped',
  InTransit = 'in_transit',
  VerifiedCenter = 'verified_center',
  Delivered = 'delivered',
}

export enum Filter_Type {
  Category = 'category',
  Product_Type = 'type',
  Sizes = 'sizes',
  Add_Brand = 'add_brand',
  Remove_Brand = 'remove_brand',
  Min_Price = 'min_price',
  Max_Price = 'max_price',
  Condition = 'condition',
  Sort_By = 'sort_by',
}

export enum Deal_Type {
  Great = 'great',
  Fair = 'fair',
  Bad = 'bad',
}
