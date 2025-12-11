export interface Position {
  x: number;
  y: number;
}

export interface Obstacle {
  id: number;
  position: Position;
  // type: 'apple-rejection' | 'google-rejection' | 'upgrade-streamchat';
  type: 'rock' | 'wave' | 'shark'
}

export interface GameState {
  playerPosition: Position;
  obstacles: Obstacle[];
  level: number;
  score: number;
  gameStatus: 'playing' | 'celebrating' | 'gameOver';
  distanceToIsland: number;
  gameOverMessage?: string;
}

export const GAME_WIDTH = 40;
export const GAME_HEIGHT = 20;
export const ISLAND_DISTANCE = 100;

export const ACCOMPLISHMENTS = [
  "When modals cut off on mobile, we cut them back",
  "Google Drive said 'embed me', we said 'become a button instead'",
  "Quiz navigation walked into a bar... and fit perfectly on mobile",
  "Teaching modals proper mobile etiquette since 2025",
  "The toolbar was playing hide and seek. We won.",
  "Markdown had trust issues. We sent it to therapy.",
  "Websockets were having emotional breakdowns. Added error handlers, now they're chill.",
  "Stop. Copying. Yourself. (A message to URL previews)",
  "URL previews saw double. We prescribed glasses.",
  "Third time's the charm for those pesky duplicate URL previews",
  "Skeletons are for Halloween, not DM screens",
  "The add button was lost. Google Maps helped us find it.",
  "Sentry was crying wolf. We told it to hush.",
  "Bumped the version number. It thanked us.",
  "Network checks: 'Am I the drama?' Yes. Yes you are.",
  "Added network loss checks. Immediately regretted it.",
  "Bouncers for the mobile app: Members only, please",
  "Admins don't complete things, they 'approve' them. Get it right.",
  "Deactivated users wanted visibility. We gave them transparency.",
  "Updated chat UI for archived members (they're not ghosts, just archived)",
  "Made deactivated users visible but in a 'you can't sit with us' way",
  "Code blocks had an identity crisis. Fixed their font.",
  "Embeditor and cover videos walk into a bar... both walk out fixed",
  "iframes wanted into the mobile editor club. Granted them membership.",
  "Toolbar was camera shy in comment editor. Gave it confidence.",
  "Introduced mobile workspace to Lexical editor. They're dating now.",
  "Gave mobile a keyboard toolbar. It felt empowered.",
  "Mobile keyboard toolbar: attempt #3 (we really wanted this one)",
  "Mobile keyboard toolbar: now with 100% more toolbar",
  "YouTube embeds landed on mobile. Subscribers went up 0%.",
  "Attachments section: because mobile deserves nice things too",
  "Made curriculum generator faster than a caffeinated squirrel",
  "Curriculum gen got brain implants (search embeddings)",
  "Quiz generator now uses embeddings. It's basically sentient.",
  "Ask AI now fits on mobile. The future is pocket-sized.",
  "Mobile comments got a bottom sheet makeover. Looking fresh.",
  "Comments migrated to bottom sheets. They love their new home.",
  "Comments moved to bottom sheets (yes, again, we're perfectionists)",
  "Disabled swipe navigation. Users can no longer accidentally leave mid-sentence.",
  "Content completion on mobile: now actually completes",
  "Quizzes and surveys joined mobile via webview. They RSVP'd yes.",
  "Empty state for product switcher: because nothing is something",
  "Timezones were messing with notifications. Put them in their place.",
  "Added dev env var for mobile prebuild. Developers rejoiced.",
  "Let videos play in background on mobile. Multitasking unlocked.",
  "Polished mobile auth UI until it sparkled",
  "Updated mobile home page tab. Home never looked so good.",
];

export const GAME_OVER_MESSAGES = [
  "Apple decided they don't like you. Resubmit your app for review and try again.",
  "Google Play Store says 'needs more Material Design.' Start over.",
  "Apple rejected your app for using too many emojis. Seriously.",
  "Your app violates guideline 4.3.2.1.7.4.9... we think. Try again.",
  "Google says your app icon is 1 pixel off. Better luck next time.",
  "TestFlight expired. Your beta testers are no longer your friends.",
  "Apple found a button that's 0.5mm too close to the edge. Rejected.",
  "Google's automated review bot had a bad day. So did you.",
  "Your app was rejected for 'not being app-y enough.' Whatever that means.",
  "Apple says you need to add Sign in with Apple. And redesign everything. Again.",
  "The Android fragmentation gods are displeased. 12,847 device configs to go.",
  "Your provisioning profile expired. As did your will to live.",
  "Google Play Console crashed while reviewing your app. They blame you.",
  "Apple's review team is on vacation. See you in 3 weeks. Start over then."
];