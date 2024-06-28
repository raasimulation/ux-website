const CHANNEL_SLUG = 'website-images-ux';
const PROJECTS_CONTAINER = document.getElementById('projects');

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


const aboutLink = document.getElementById('aboutlink');
const aboutSection = document.getElementById('about');

const rasimLink = document.getElementById('index');

const setActiveTab = (element) => {
    document.querySelectorAll('.left li').forEach(li => {
        li.classList.remove('active-tab');
    });
    element.classList.add('active-tab');
};

if (aboutLink && aboutSection) {
    aboutLink.addEventListener('click', event => {
        event.preventDefault();
        aboutSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        setActiveTab(aboutLink);
    });
}

if (rasimLink) {
    rasimLink.addEventListener('click', event => {
        event.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setActiveTab(rasimLink);
    });
}