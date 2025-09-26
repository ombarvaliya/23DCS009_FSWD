// Real User Management System for Chatter
// Add this script to your HTML file after the Firebase initialization

// Enhanced invite button functionality for real users
function initializeRealUserSystem() {
    const inviteBtn = document.getElementById('inviteBtn');

    // Replace the existing invite button event listener
    inviteBtn.addEventListener('click', () => {
        if (currentView === 'people') {
            showInviteOptions();
        } else {
            const url = location.href;
            location.href = `mailto:?subject=Join me on Chatter&body=Let's chat here: ${url}`;
        }
    });

    // Check for invitation code on page load
    checkForInvitationCode();
}

// Check for invitation code in URL
function checkForInvitationCode() {
    const urlParams = new URLSearchParams(window.location.search);
    const inviteCode = urlParams.get('invite');
    if (inviteCode) {
        handleInvitationLink(inviteCode);
    }
}

// Handle invitation link
async function handleInvitationLink(inviteCode) {
    try {
        // Show invitation message
        const message = `🎉 You've received an invitation to join Chatter!\n\nInvitation Code: ${inviteCode}\n\nPlease create an account or sign in to accept this invitation.`;
        alert(message);

        // Store invitation in session for after login
        sessionStorage.setItem('pendingInvitationCode', inviteCode);

    } catch (error) {
        console.error('Error handling invitation:', error);
        alert('Error processing invitation: ' + error.message);
    }
}

// Show real user invitation options
function showInviteOptions() {
    const options = prompt(`Choose an option:

1. Send email invitation to a real person
2. Create test users for demo
3. Generate invitation link to share

Enter 1, 2, or 3:`);

    switch (options) {
        case '1':
            sendEmailInvitation();
            break;
        case '2':
            createTestUsers();
            break;
        case '3':
            generateInvitationLink();
            break;
        default:
            alert('Invalid option selected');
    }
}

// Send email invitation to real users
async function sendEmailInvitation() {
    const email = prompt('Enter the email address of the person you want to invite:');
    if (!email || !email.includes('@')) {
        alert('Please enter a valid email address');
        return;
    }

    try {
        const me = auth.currentUser;
        if (!me) {
            alert('Please log in first');
            return;
        }

        // Generate invitation code
        const invitationCode = Math.random().toString(36).substring(2, 15);

        // Create invitation record in Firestore
        const invitationId = `inv_${Date.now()}`;
        await setDoc(doc(db, 'invitations', invitationId), {
            invitationId,
            invitationCode,
            inviterUid: me.uid,
            inviterName: me.displayName || me.email,
            inviterEmail: me.email,
            inviteeEmail: email,
            status: 'pending',
            createdAt: serverTimestamp(),
            expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 days
        });

        // Generate invitation link
        const inviteLink = `${window.location.origin}${window.location.pathname}?invite=${invitationCode}`;

        // Create email content
        const subject = `${me.displayName || me.email} invited you to join Chatter`;
        const body = `Hi!

${me.displayName || me.email} has invited you to join Chatter, a secure chat platform.

Click the link below to join:
${inviteLink}

Or visit ${window.location.origin}${window.location.pathname} and use invitation code: ${invitationCode}

This invitation expires in 7 days.

Best regards,
Chatter Team`;

        // Open email client
        window.open(`mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`);

        alert(`✅ Email invitation prepared for ${email}!

Invitation Code: ${invitationCode}
Link: ${inviteLink}

The email client should open automatically. If not, copy the link above and send it manually.`);

    } catch (error) {
        console.error('Error sending invitation:', error);
        alert('Error sending invitation: ' + error.message);
    }
}

// Generate invitation link for sharing
async function generateInvitationLink() {
    try {
        const me = auth.currentUser;
        if (!me) {
            alert('Please log in first');
            return;
        }

        const invitationCode = Math.random().toString(36).substring(2, 15);
        const invitationId = `inv_${Date.now()}`;

        // Create invitation record in Firestore
        await setDoc(doc(db, 'invitations', invitationId), {
            invitationId,
            invitationCode,
            inviterUid: me.uid,
            inviterName: me.displayName || me.email,
            inviterEmail: me.email,
            inviteeEmail: '', // General invitation
            status: 'pending',
            createdAt: serverTimestamp(),
            expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
            isGeneral: true
        });

        const inviteLink = `${window.location.origin}${window.location.pathname}?invite=${invitationCode}`;

        // Copy to clipboard if possible
        if (navigator.clipboard) {
            try {
                await navigator.clipboard.writeText(inviteLink);
                alert(`✅ Invitation link generated and copied to clipboard!

Link: ${inviteLink}
Code: ${invitationCode}

Share this link with people you want to invite. The link will expire in 7 days.`);
            } catch (err) {
                showInvitationDetails(inviteLink, invitationCode);
            }
        } else {
            showInvitationDetails(inviteLink, invitationCode);
        }

    } catch (error) {
        console.error('Error generating invitation:', error);
        alert('Error generating invitation: ' + error.message);
    }
}

function showInvitationDetails(inviteLink, invitationCode) {
    alert(`✅ Invitation link generated!

Link: ${inviteLink}
Code: ${invitationCode}

Copy this link and share it with people you want to invite. The link will expire in 7 days.`);
}

// Enhanced createTestUsers function
async function createTestUsers() {
    const me = auth.currentUser;
    if (!me) {
        alert('Please log in first');
        return;
    }

    const testUsers = [
        { name: 'Alice Johnson', email: 'alice@example.com' },
        { name: 'Bob Smith', email: 'bob@example.com' },
        { name: 'Carol Davis', email: 'carol@example.com' },
        { name: 'David Wilson', email: 'david@example.com' },
        { name: 'Emma Garcia', email: 'emma@example.com' },
        { name: 'John Doe', email: 'john@example.com' }
    ];

    try {
        console.log('Creating test user documents...');
        let created = 0;

        for (const testUser of testUsers) {
            const fakeUid = `test_${testUser.email.split('@')[0]}`;

            // Check if user already exists
            const existingUser = await getDoc(doc(db, 'users', fakeUid));
            if (!existingUser.exists()) {
                await setDoc(doc(db, 'users', fakeUid), {
                    uid: fakeUid,
                    name: testUser.name,
                    email: testUser.email,
                    photoURL: `https://api.dicebear.com/9.x/thumbs/svg?seed=${encodeURIComponent(testUser.name)}`,
                    createdAt: serverTimestamp(),
                    isTestUser: true,
                    bio: `Hi, I'm ${testUser.name}! This is a test account for demo purposes.`
                });
                created++;
            }
        }

        alert(`✅ ${created} test users created successfully! You can see them in the People section.`);

        // Refresh the user list if in people view
        if (typeof currentView !== 'undefined' && currentView === 'people') {
            setTimeout(() => {
                if (typeof loadAllUsers === 'function') {
                    loadAllUsers();
                }
            }, 1000);
        }
    } catch (error) {
        console.error('Error creating test users:', error);
        alert('Error creating test users: ' + error.message);
    }
}

// Process pending invitation after successful login/signup
async function processPendingInvitation() {
    const pendingInvitationCode = sessionStorage.getItem('pendingInvitationCode');
    if (!pendingInvitationCode) return;

    try {
        const me = auth.currentUser;
        if (!me) return;

        // Look for the invitation
        const invitationsRef = collection(db, 'invitations');
        const q = query(invitationsRef, where('invitationCode', '==', pendingInvitationCode));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
            const invitationDoc = querySnapshot.docs[0];
            const invitation = invitationDoc.data();

            // Mark invitation as accepted
            await updateDoc(invitationDoc.ref, {
                status: 'accepted',
                acceptedBy: me.uid,
                acceptedAt: serverTimestamp()
            });

            // Clear pending invitation
            sessionStorage.removeItem('pendingInvitationCode');

            alert(`🎉 Welcome to Chatter! You've successfully joined via ${invitation.inviterName}'s invitation.`);

            // Auto-start chat with inviter if possible
            if (invitation.inviterUid) {
                setTimeout(() => {
                    if (typeof startChatWith === 'function') {
                        startChatWith(invitation.inviterUid);
                    }
                }, 2000);
            }
        }
    } catch (error) {
        console.error('Error processing pending invitation:', error);
    }
}

// Enhanced user loading with real user indicators
async function loadRealUsers() {
    const me = auth.currentUser;
    if (!me) {
        console.log('No authenticated user');
        return;
    }

    try {
        console.log('Loading all users...');
        const usersRef = collection(db, 'users');
        const qs = await getDocs(usersRef);

        console.log('Total users found:', qs.size);
        const allUsers = qs.docs.map(d => d.data());

        // Separate real users from test users
        const realUsers = allUsers.filter(u => u.uid !== me.uid && !u.isTestUser);
        const testUsers = allUsers.filter(u => u.uid !== me.uid && u.isTestUser);

        console.log('Real users:', realUsers.length);
        console.log('Test users:', testUsers.length);

        if (realUsers.length === 0 && testUsers.length === 0) {
            showNoUsersMessage();
        } else {
            renderUsersList([...realUsers, ...testUsers]);
        }
    } catch (error) {
        console.error('Error loading users:', error);
        showErrorMessage('Error loading users: ' + error.message);
    }
}

function showNoUsersMessage() {
    if (typeof recentList !== 'undefined') {
        recentList.innerHTML = `
      <div style="padding: 20px; text-align: center; color: #aeb7e9;">
        <h3>No other users found</h3>
        <p>To add real users:</p>
        <ol style="text-align: left; margin: 10px 0;">
          <li>Click the "+" button above</li>
          <li>Choose option 1 to send email invitations</li>
          <li>Or choose option 3 to generate a shareable link</li>
          <li>Send the link to friends/colleagues</li>
        </ol>
        <p><small>Or create test users for demo purposes</small></p>
      </div>
    `;
    }
}

function showErrorMessage(message) {
    if (typeof recentList !== 'undefined') {
        recentList.innerHTML = `
      <div style="padding: 20px; text-align: center; color: var(--danger);">
        ${message}
      </div>
    `;
    }
}

function renderUsersList(users) {
    if (typeof recentList === 'undefined' || typeof renderPeople !== 'function') {
        console.error('Required UI functions not available');
        return;
    }

    renderPeople(users);
}

// Initialize the real user system when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeRealUserSystem);
} else {
    initializeRealUserSystem();
}

// Export functions for global use
window.sendEmailInvitation = sendEmailInvitation;
window.generateInvitationLink = generateInvitationLink;
window.createTestUsers = createTestUsers;
window.processPendingInvitation = processPendingInvitation;
window.loadRealUsers = loadRealUsers;