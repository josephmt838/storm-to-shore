// Mock data for the Storm to Shore application
export const mockPrayerRequests = [
    {
        id: 1,
        name: 'Sarah',
        email: 'sarah@example.com',
        title: 'Tough Times',
        content:
            "Please pray for my family as we go through a difficult time. My husband lost his job and we're struggling to make ends meet. I trust God has a plan, but it's hard to see right now.",
        isPublic: true,
        needsFollowUp: true,
        prayerStatus: 'APPROVED',
        createdAt: new Date('2024-01-15T10:30:00Z'),
    },
    {
        id: 2,
        name: 'Michael',
        email: 'michael@example.com',
        content:
            "I'm going through a season of doubt and questioning my faith. Please pray that God would reveal himself to me and help me find peace in His presence.",
        isPublic: true,
        needsFollowUp: false,
        prayerStatus: 'APPROVED',
        createdAt: new Date('2024-01-14T15:20:00Z'),
    },
    {
        id: 3,
        name: null,
        email: null,
        content:
            "Please pray for healing in my marriage. We've been struggling to communicate and I feel like we're drifting apart. I want to honor God in our relationship.",
        isPublic: true,
        needsFollowUp: false,
        prayerStatus: 'APPROVED',
        createdAt: new Date('2024-01-13T08:45:00Z'),
    },
    {
        id: 4,
        name: 'Jennifer',
        email: 'jennifer@example.com',
        content:
            "My teenage son is making some poor choices and I'm worried about his future. Please pray for wisdom as I guide him and for God to work in his heart.",
        isPublic: true,
        needsFollowUp: true,
        prayerStatus: 'APPROVED',
        createdAt: new Date('2024-01-12T19:15:00Z'),
    },
    {
        id: 5,
        name: 'David',
        email: 'david@example.com',
        content:
            "I've been battling depression and anxiety. Some days it feels overwhelming. Please pray that I would feel God's peace and find the strength to keep going.",
        isPublic: true,
        needsFollowUp: false,
        prayerStatus: 'APPROVED',
        createdAt: new Date('2024-01-11T12:00:00Z'),
    },
    {
        id: 6,
        name: 'Emily',
        email: 'emily@example.com',
        content:
            "Please pray for my grandmother who is in the hospital. The doctors aren't sure what's wrong and our family is really scared. We trust in God's plan but need comfort.",
        isPublic: false,
        needsFollowUp: true,
        prayerStatus: 'PENDING',
        createdAt: new Date('2024-01-16T14:30:00Z'),
    },
];

export const mockContactMessages = [
    {
        id: 1,
        name: 'Robert Johnson',
        email: 'robert.johnson@email.com',
        message:
            "I'm interested in volunteering with your discipleship. I have experience in youth outreach and would love to help with community events. Please let me know how I can get involved.",
        createdAt: new Date('2024-01-15T09:20:00Z'),
    },
    {
        id: 2,
        name: 'Maria Garcia',
        email: 'maria.garcia@email.com',
        message:
            "Your recent video on finding hope in difficult times really spoke to my heart. Thank you for sharing God's word so clearly. Could you recommend some books for someone going through grief?",
        createdAt: new Date('2024-01-14T16:45:00Z'),
    },
    {
        id: 3,
        name: 'Pastor James Wilson',
        email: 'jwilson@communitychurch.org',
        message:
            "We would love to have you speak at our church's upcoming revival event in March. Your discipleship's focus on hope and healing aligns perfectly with our theme. Please let me know if you're available.",
        createdAt: new Date('2024-01-13T11:30:00Z'),
    },
];

// Helper functions for managing mock data
let nextPrayerId = 7;
let nextContactId = 4;

export const addPrayerRequest = (newRequest) => {
    const prayer = {
        ...newRequest,
        id: nextPrayerId++,
        prayerStatus: 'PENDING',
        createdAt: new Date(),
    };
    mockPrayerRequests.push(prayer);
    return prayer;
};

export const addContactMessage = (newMessage) => {
    const message = {
        ...newMessage,
        id: nextContactId++,
        createdAt: new Date(),
    };
    mockContactMessages.push(message);
    return message;
};

export const updatePrayerStatus = (id, prayerStatus) => {
    const prayer = mockPrayerRequests.find((p) => p.id === id);
    if (prayer) {
        prayer.prayerStatus = prayerStatus;
        return prayer;
    }
    return null;
};

export const getPublicApprovedPrayers = () => {
    return mockPrayerRequests
        .filter(
            (prayer) => prayer.isPublic && prayer.prayerStatus === 'APPROVED',
        )
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
};

export const getAllPrayers = () => {
    return mockPrayerRequests.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
    );
};

export const getAllContactMessages = () => {
    return mockContactMessages.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
    );
};
