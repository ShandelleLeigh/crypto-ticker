class Coin < ApplicationRecord
  validates_uniqueness_of :cmc_id, :name, :symbol, { case_sensivite: false }
  validates_presence_of :cmc_id, :name, :symbol
  has_many :watched_coins, dependent: :destroy
  has_many :users, through: :watched_coins

  def self.create_by_cmc_id(res)
    #if response code is in 200's:
    if  /^2\d\d$/ =~ res.code.to_s
      #turns 200's error to string
      match = res[0].with_indifferent_access
      # match = response at pos 0 in array,
      # method you can call on hash,  makes it so that call for
      #  match['id']  or  match[:id] to return => "bitcoin"

      coin_params = {
        name: match[:name],
        symbol: match[:symbol],
        cmc_id: match[:id]
      }

      #if coin exists with ^^^ name, symbol, cmc_id, find it, if not exist, make it:
      #then make it so it can update: price, and date/time of last fetch
      #  .find_or_create_by is a built in rails method:
      Coin.find_or_create_by(coin_params) do |coin|
        coin.price = match[:price_usd]
        coin.last_fetched = DateTime.now
      end
    else
      nil
      #if coin is not a real coin, return nil,
      ##else if, coine doesnt exist, and you dont say else: nil, js automatically
      #returns nill, too, but add in else nill for readability
    end
  end

end
