class Api::CoinsController < ApplicationController
  before_action :authenticate_user!
  before_action :set_coin, only: [:update, :destroy]
  #only need update and destroy, because when showing coin, it doesn't need to talk to db,
  BASE_URL = 'https://api.coinmarketcap.com/v1/ticker/'

  def index
    coins = HTTParty.get(BASE_URL)  #this will only auto update top 100 coins.
    user_coins = current_user.coins #only call for coins that current user has
    user_coins.each do |coin| #loop over coins in db,
      res_coin = coins.find { |c| c['id'] == coin.cmc_id } # response coin = hash of coins, find each individual coin by id, where == cmc_id
      coin.update(price: res_coin['price_usd']) if res_coin # then update the price, of coin, if there's a response,

    end
    render json: current_user.coins
  end

  def show
    res = HTTParty get("#{BASE_URL}#{params[:id]}")
    render json: res[0]
  end

  def create
    cmc_id = params[:coin].downcase
    #grabs whatever user types in, that user wants to start watching.
    res = HTTParty.get("#{BASE_URL}#{cmc_id}")
    # next line: getting from db, and moving into controller,
    if coin = Coin.create_by_cmc_id(res)
      #coin keeps init price in local db, but not all updates, since that'd fill up db
      #^^if res == truthy, coin is = to what is returned(so if coin is something that exists in api)
      #watched creates thru relationship,  if it already exists, update it:
      watched = WatchedCoin.find_or_create_by(coin_id: coin.id, user_id: current_user.id)
      #if coin exists, update it , if it doesn't exist, crate it ^^
      watched.update(initial_price: coin.price) if watched.initial_price.nil?
      #update init price only if it doesn't already have one, we want to keep
      #init coin price at what it cost when user initially started 'watching' it
      render json: coin
    else
      render json: { errors: 'Coin Not Found' }, status: 422
      #else, just render coin not found,
    end
  end

  def update
    current_user.watched_coins.find_by(coin_id: @coin.id).destroy
  end

  def destroy
    @coin.destroy
  end

  private
  def set_coin
    @coin = Coin.find(params[:id])
  end
end
