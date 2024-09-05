import stories from "./DATA.json";

export type Story = {
    id: string;
    name: string;
    description: string;
    photoUrl: string;
    createdAt: string;
};

export let data: Story[] = stories.listStory;
