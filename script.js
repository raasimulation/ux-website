const CHANNEL_SLUG = 'website-images-ux';
const PROJECTS_CONTAINER = document.getElementById('main');

async function fetchChannelContents(channelSlug) {
    try {
        const url = `https://api.are.na/v2/channels/website-images-ux/contents`;
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        if (!data || !data.contents) {
            throw new Error('Invalid API response');
        }

        return data.contents;
    } catch (error) {
        console.error('Failed to fetch channel contents:', error);
        return [];
    }
}

async function updateImages() {
    const contents = await fetchChannelContents(CHANNEL_SLUG);

    if (!contents.length) {
        console.warn('No contents found in the channel.');
        return;
    }

    contents.forEach(content => {
        if (content.class === 'Image') {
            const filename = content.title; // Assuming title contains the filename
            const imgElements = document.querySelectorAll(`img[src="${filename}"]`);
            imgElements.forEach(img => {
                const imageUrl = content.image.original.url; // Get the original image URL from Are.na
                img.src = imageUrl; // Update the src attribute with the Are.na image URL
            });
        }
    });
}

// Update images on page load
updateImages();

document.addEventListener('DOMContentLoaded', () => {
    const toggleButtons = document.querySelectorAll('.collapse-button');

    toggleButtons.forEach(button => {
        button.addEventListener('click', () => {
            const collapsibleContent = button.nextElementSibling;
            const icon = button.querySelector('i');

            if (collapsibleContent.classList.contains('show')) {
                collapsibleContent.classList.remove('show');
                setTimeout(() => {
                    collapsibleContent.style.display = 'none';
                }, 500); // Match this duration to the transition time
                icon.className = 'ph ph-caret-down';
            } else {
                collapsibleContent.style.display = 'block';
                setTimeout(() => {
                    collapsibleContent.classList.add('show');
                }, 10); // Small delay to ensure display change takes effect
                icon.className = 'ph ph-caret-up';
            }
        });
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const city = "America/New_York"; // Richmond, VA timezone
    const cityName = "Richmond";
    const datetimeElement = document.getElementById("datetime");

    if (datetimeElement) {
        fetch(`http://worldtimeapi.org/api/timezone/${city}`)
            .then(response => response.json())
            .then(data => {
                const dateTime = new Date(data.datetime);
                const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
                const formattedDate = dateTime.toLocaleDateString('en-US', options);
                datetimeElement.textContent = `${cityName} /  ${formattedDate}`;
            })
            .catch(error => {
                console.error("Error fetching time data:", error);
                datetimeElement.textContent = "Error fetching time data.";
            });
    } else {
        console.error("Element with ID 'datetime' not found.");
    }
});

