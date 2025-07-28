from django.shortcuts import render
from django.contrib import messages

def home(request):
    """Home page view with SEO optimizations"""
    context = {
        'page_title': 'Home - Parbat Furniture Udhyog | Premium Quality Furniture',
        'meta_description': 'Parbat Furniture Udhyog - Leading furniture manufacturer in Nepal. Premium quality custom furniture for homes and offices.',
        'canonical_url': request.build_absolute_uri(),
    }
    return render(request, 'core/home.html', context)

def about(request):
    """About page view with SEO optimizations"""
    context = {
        'page_title': 'About Us - Parbat Furniture Udhyog | Our Story & Craftsmanship',
        'meta_description': 'Learn about Parbat Furniture Udhyog - Nepal\'s trusted furniture manufacturer with years of experience in crafting premium quality furniture.',
        'canonical_url': request.build_absolute_uri(),
    }
    return render(request, 'core/about.html', context)

def products(request):
    """Products showcase page view"""
    context = {
        'page_title': 'Our Products - Parbat Furniture Udhyog | Premium Furniture Collection',
        'meta_description': 'Explore our premium furniture collection - Sofa sets, dining tables, bedroom furniture, office furniture, and custom designs.',
        'canonical_url': request.build_absolute_uri(),
    }
    return render(request, 'core/products.html', context)

def services(request):
    """Services page view"""
    context = {
        'page_title': 'Our Services - Parbat Furniture Udhyog | Professional Furniture Services',
        'meta_description': 'Professional furniture services - Custom design, manufacturing, installation, repair, and maintenance services in Nepal.',
        'canonical_url': request.build_absolute_uri(),
    }
    return render(request, 'core/services.html', context)

def contact(request):
    """Contact page view with form handling"""
    if request.method == 'POST':
        # Handle contact form submission
        # In a real application, you would process the form data here
        # For now, we'll just show a success message
        messages.success(request, 'Thank you for your message! We will get back to you within 24 hours.')

        # In a real application, you might want to:
        # 1. Save the contact form data to a database
        # 2. Send an email notification to the business
        # 3. Send a confirmation email to the customer

    context = {
        'page_title': 'Contact Us - Parbat Furniture Udhyog | Get in Touch',
        'meta_description': 'Contact Parbat Furniture Udhyog for premium furniture solutions. Visit our showroom, call us, or send a message.',
        'canonical_url': request.build_absolute_uri(),
    }
    return render(request, 'core/contact.html', context)