import tkinter as tk
from tkinter import ttk, messagebox
from data_handler import fetch_data,save_to_csv
from dashbord import plot_data
import threading
from PIL import Image, ImageTk

root = tk.Tk()
root.title("Python Finance Dashboard")
root.geometry("480x400")
root.config(bg="#121212")

style = ttk.Style()
style.configure("TButton", font=("Segoe UI", 11, "bold"), padding=8, background="#0078D4", foreground="white")
style.configure("TLabel", background="#121212", foreground="white", font=("Segoe UI", 10))
style.configure("TEntry", padding=5)


def run_dashboard():
    symbol = symbol_entry.get().upper()
    if not symbol:
        messagebox.showerror("error","please enter a Symbol!")
        return
    
    status_label.config(text= "Fetching data...")
    progress.start()

    def task():
        try:
            data = fetch_data(symbol)
            save_to_csv(data, f"{symbol}_data.csv")
            plot_data(data,symbol)
            status_label.config(text=f" Done! Saved as {symbol}_data.csv")
        except Exception as e:
             messagebox.showerror("error",str(e))
        finally:
             progress.stop()
             threading.Thread(target=task).start()


try:
    logo_img = Image.open("assets/logo.png")
    logo_img = logo_img.resize((100, 100))
    logo = ImageTk.PhotoImage(logo_img)
    tk.Label(root, image=logo, bg="#121212").pack(pady=10)
except:
    tk.Label(root, text="💹", font=("Segoe UI", 35), bg="#121212", fg="#00bfff").pack(pady=10)


ttk.Label(root, text="Enter Stock/Forex Symbol:").pack(pady=10)
symbol_entry = ttk.Entry(root, width=30)
symbol_entry.pack(pady=5)

ttk.Button(root, text="Fetch & Plot Data", command=run_dashboard).pack(pady=15)

progress = ttk.Progressbar(root, mode="indeterminate", length=250)
progress.pack(pady=10)

status_label = ttk.Label(root, text="")
status_label.pack(pady=10)

tk.Label(root, text="Example: AAPL (Apple), BTC-USD, EURUSD=X", bg="#121212", fg="gray").pack(pady=10)

root.mainloop()


