from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login, logout
from django.contrib import messages
from .forms import SignUpForm, AddRecordForm
from .models import Record

# Create your views here.

def home(request):
	records = Record.objects.all()
	# check to see if user logging in
	if request.method == 'POST':
		username = request.POST['username']
		password = request.POST['password']

		#authenticate user
		user = authenticate(request, username=username, password=password)

		#check user exists
		if user is not None:
			login(request, user)
			messages.success(request, "You have successfully logged in.")
			return redirect('home')
		else:
			messages.success(request, "There was an error logging in.")
			return redirect('home')
	else:
		return render(request, 'home.html', {'records': records})


def logout_user(request):
	logout(request)
	messages.success(request, "You have been logged out...")
	return redirect('home')

def register_user(request):
	if request.method == 'POST':
		form = SignUpForm(request.POST)
		if form.is_valid():
			form.save()
			# authenticate and login in
			username = form.cleaned_data['username']
			password = form.cleaned_data['password1']
			user = authenticate(username=username, password=password)
			login(request, user)
			messages.success(request, "You have successfully logged in.")
			return redirect('home')
	else:
		form = SignUpForm()
		return render(request, 'register.html', {'form':form})
	return render(request, 'register.html', {'form':form})

def customer_record(request, pk):
	if request.user.is_authenticated:
		record = Record.objects.get(id=pk)
		return render(request, 'record.html', {'record':record})
	else:
		messages.success(request, "You have to be logged in to view this page.")
		return redirect('home')
	
def delete_record(request, pk):
	if request.user.is_authenticated:
		record = Record.objects.get(id=pk)
		record.delete()
		messages.success(request, "Record deleted successfully.")
		return redirect('home')
	else:
		messages.success(request, "You have to be logged in to perform this action.")
		return redirect('home')
	
def add_record(request):
	form = AddRecordForm(request.POST or None)
	if request.user.is_authenticated:
		if request.method == "POST":
			if form.is_valid():
				form.save()
				messages.success(request, "Record added ...")
				return redirect('home')
		return render(request, 'add_record.html', {'form': form})
	else:
		messages.success(request, "You have to be logged in to view this page.")
		return redirect('home')
