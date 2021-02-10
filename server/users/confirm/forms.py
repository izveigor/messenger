from django import forms


class ChangePasswordForm(forms.Form):
    password = forms.CharField(label='', widget=forms.PasswordInput(
                               attrs={'class': "input_password", "id": "password",
                                      "maxlength": "30", "placeholder": "Password"}))
    repeat_password = forms.CharField(label='', widget=forms.PasswordInput(
                               attrs={'class': "input_password", "id": "password",
                                      "maxlength": "30", "placeholder": "Repeat password"}))