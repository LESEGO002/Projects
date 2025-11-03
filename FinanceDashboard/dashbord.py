import matplotlib.pyplot as plt

def plot_data(data, symbol):
    plt.style.use("dark_background")
    plt.figure(figsize=(10, 5))
    plt.plot(data["Date"], data["Close"], color="#00bfff", linewidth=2.2, label=f"{symbol} Price")
    plt.title(f"{symbol} Market Chart", color="white")
    plt.xlabel("Date", color="white")
    plt.ylabel("Price (USD)", color="white")
    plt.legend()
    plt.grid(True, linestyle="--", alpha=0.5)
    plt.tight_layout()
    plt.show()