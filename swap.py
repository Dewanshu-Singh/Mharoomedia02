import re

with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Pattern for 09. OUR SERVICES
# It starts with <!-- 09. OUR SERVICES --> and ends with the </section> before <!-- 10. OUR CREATIVES -->
services_pattern = r"(<!-- 09\. OUR SERVICES -->.*?)(?=<!-- 10\. OUR CREATIVES -->)"
services_match = re.search(services_pattern, content, re.DOTALL)

# Pattern for 12. VIDEO AD
# It starts with <!-- 12. VIDEO AD --> and ends with the </section> before <!-- 12.1 EVENTS CONDUCTED -->
video_pattern = r"(<!-- 12\. VIDEO AD -->.*?)(?=<!-- 12\.1 EVENTS CONDUCTED -->)"
video_match = re.search(video_pattern, content, re.DOTALL)

if services_match and video_match:
    services_text = services_match.group(1)
    video_text = video_match.group(1)
    
    # Replace in content
    # To do this safely, we will replace the video text with a placeholder,
    # then replace the services text with the video text,
    # then replace the placeholder with the services text.
    
    new_content = content.replace(video_text, "___PLACEHOLDER___")
    new_content = new_content.replace(services_text, video_text)
    new_content = new_content.replace("___PLACEHOLDER___", services_text)
    
    with open('index.html', 'w', encoding='utf-8') as f:
        f.write(new_content)
    print("Swapped successfully.")
else:
    print("Could not find one of the sections.")
