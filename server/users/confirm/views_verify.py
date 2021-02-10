from django.shortcuts import render
from .forms import ChangePasswordForm

def verify_email(request, url_string):
    return render(request, 'confirm_register.html')


def change_password(request, url_string):
    if request.method == "GET":
        form = ChangePasswordForm()
        return render(request, 'change_password.html', {'form': form})
    if request.method == "POST":
        form = ChangePasswordForm(request.POST)
        if form.is_valid():
            return render(request, 'new_password.html')