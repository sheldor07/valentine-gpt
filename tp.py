import requests
from bs4 import BeautifulSoup
import sys

def get_seo_tags(url):
    try:
        # Send a GET request to the URL
        response = requests.get(url)
        response.raise_for_status()  # Raise an exception for bad status codes
        
        # Parse the HTML content
        soup = BeautifulSoup(response.text, 'html.parser')
        
        # Extract relevant SEO tags
        seo_tags = {
            'title': soup.title.string if soup.title else None,
            'meta_description': soup.find('meta', attrs={'name': 'description'})['content'] if soup.find('meta', attrs={'name': 'description'}) else None,
            'meta_keywords': soup.find('meta', attrs={'name': 'keywords'})['content'] if soup.find('meta', attrs={'name': 'keywords'}) else None,
            'og_title': soup.find('meta', property='og:title')['content'] if soup.find('meta', property='og:title') else None,
            'og_description': soup.find('meta', property='og:description')['content'] if soup.find('meta', property='og:description') else None,
            'og_image': soup.find('meta', property='og:image')['content'] if soup.find('meta', property='og:image') else None,
            'twitter_card': soup.find('meta', attrs={'name': 'twitter:card'})['content'] if soup.find('meta', attrs={'name': 'twitter:card'}) else None,
            'twitter_title': soup.find('meta', attrs={'name': 'twitter:title'})['content'] if soup.find('meta', attrs={'name': 'twitter:title'}) else None,
            'twitter_description': soup.find('meta', attrs={'name': 'twitter:description'})['content'] if soup.find('meta', attrs={'name': 'twitter:description'}) else None,
            'twitter_image': soup.find('meta', attrs={'name': 'twitter:image'})['content'] if soup.find('meta', attrs={'name': 'twitter:image'}) else None,
        }
        
        return seo_tags
    
    except requests.RequestException as e:
        print(f"Error fetching the webpage: {e}")
        return None

def print_seo_tags(tags):
    if tags:
        for key, value in tags.items():
            print(f"{key.replace('_', ' ').title()}: {value}")
    else:
        print("No SEO tags found or there was an error fetching the page.")

if __name__ == "__main__":
    
    url = 'https://valentinegpt.netlify.app/'
    seo_tags = get_seo_tags(url)
    print_seo_tags(seo_tags)