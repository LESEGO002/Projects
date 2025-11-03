import yfinance as yf
import pandas as pd

def fetch_data(symbol, peroid="1mo",interval="1d" ):
    data = yf.download(symbol, period=peroid, interval=interval)
    data.reset_index(inplace=True)
    return data

def save_to_csv(data, filename="market_data.csv"):
    data.to_csv(filename, index=False)
    print(f" Data saved to{filename}")