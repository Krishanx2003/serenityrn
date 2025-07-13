import { LinearGradient } from 'expo-linear-gradient';
import {
    Award,
    Bell,
    Calendar,
    ChevronRight,
    Heart,
    Moon,
    Settings,
    Star,
    Target,
    TrendingUp,
    User
} from 'lucide-react-native';
import { useState } from 'react';
import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Switch,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

const WELLNESS_GOALS = [
  { id: 1, title: 'Daily Meditation', progress: 80, target: '10 min/day' },
  { id: 2, title: 'Mood Tracking', progress: 95, target: 'Daily check-ins' },
  { id: 3, title: 'Gratitude Practice', progress: 60, target: '3 items/day' },
  { id: 4, title: 'Mindful Breathing', progress: 45, target: '5 sessions/week' },
];

const ACHIEVEMENTS = [
  { id: 1, title: '7-Day Streak', icon: '🔥', unlocked: true },
  { id: 2, title: 'Mindful Master', icon: '🧘', unlocked: true },
  { id: 3, title: 'Grateful Heart', icon: '💖', unlocked: false },
  { id: 4, title: 'Peace Keeper', icon: '☮️', unlocked: true },
];

export default function ProfileScreen() {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [darkModeEnabled, setDarkModeEnabled] = useState(false);

  const renderGoal = (goal: typeof WELLNESS_GOALS[0]) => (
    <View key={goal.id} style={styles.goalCard}>
      <View style={styles.goalHeader}>
        <Text style={styles.goalTitle}>{goal.title}</Text>
        <Text style={styles.goalTarget}>{goal.target}</Text>
      </View>
      <View style={styles.progressContainer}>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: `${goal.progress}%` }]} />
        </View>
        <Text style={styles.progressText}>{goal.progress}%</Text>
      </View>
    </View>
  );

  const renderAchievement = (achievement: typeof ACHIEVEMENTS[0]) => (
    <TouchableOpacity 
      key={achievement.id} 
      style={[
        styles.achievementCard,
        !achievement.unlocked && styles.achievementLocked
      ]}
      activeOpacity={0.8}>
      <Text style={[
        styles.achievementIcon,
        !achievement.unlocked && styles.achievementIconLocked
      ]}>
        {achievement.icon}
      </Text>
      <Text style={[
        styles.achievementTitle,
        !achievement.unlocked && styles.achievementTitleLocked
      ]}>
        {achievement.title}
      </Text>
      {achievement.unlocked && (
        <View style={styles.unlockedBadge}>
          <Star size={12} color="#FFD700" fill="#FFD700" />
        </View>
      )}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#F8F9FF', '#F0F4FF']}
        style={styles.gradient}>
        
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Profile Header */}
          <View style={styles.profileHeader}>
            <LinearGradient
              colors={['#9C88FF', '#7B68EE']}
              style={styles.profileGradient}>
              <View style={styles.profileInfo}>
                <View style={styles.avatarContainer}>
                  <User size={32} color="#FFFFFF" />
                </View>
                <View style={styles.userInfo}>
                  <Text style={styles.userName}>Sarah Johnson</Text>
                  <Text style={styles.userJoinDate}>Mindful since January 2024</Text>
                </View>
              </View>
              <View style={styles.profileStats}>
                <View style={styles.statItem}>
                  <Text style={styles.statNumber}>42</Text>
                  <Text style={styles.statLabel}>Days</Text>
                </View>
                <View style={styles.statDivider} />
                <View style={styles.statItem}>
                  <Text style={styles.statNumber}>18</Text>
                  <Text style={styles.statLabel}>Meditations</Text>
                </View>
                <View style={styles.statDivider} />
                <View style={styles.statItem}>
                  <Text style={styles.statNumber}>125</Text>
                  <Text style={styles.statLabel}>Minutes</Text>
                </View>
              </View>
            </LinearGradient>
          </View>

          {/* Wellness Goals */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Wellness Goals</Text>
              <TouchableOpacity style={styles.sectionAction}>
                <Target size={20} color="#9C88FF" />
              </TouchableOpacity>
            </View>
            {WELLNESS_GOALS.map(renderGoal)}
          </View>

          {/* Achievements */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Achievements</Text>
              <TouchableOpacity style={styles.sectionAction}>
                <Award size={20} color="#9C88FF" />
              </TouchableOpacity>
            </View>
            <View style={styles.achievementsGrid}>
              {ACHIEVEMENTS.map(renderAchievement)}
            </View>
          </View>

          {/* Settings */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Settings</Text>
            
            <TouchableOpacity style={styles.settingItem}>
              <View style={styles.settingLeft}>
                <Bell size={24} color="#9C88FF" />
                <Text style={styles.settingText}>Notifications</Text>
              </View>
              <Switch
                value={notificationsEnabled}
                onValueChange={setNotificationsEnabled}
                trackColor={{ false: '#E5E7EB', true: '#9C88FF' }}
                thumbColor="#FFFFFF"
              />
            </TouchableOpacity>

            <TouchableOpacity style={styles.settingItem}>
              <View style={styles.settingLeft}>
                <Moon size={24} color="#9C88FF" />
                <Text style={styles.settingText}>Dark Mode</Text>
              </View>
              <Switch
                value={darkModeEnabled}
                onValueChange={setDarkModeEnabled}
                trackColor={{ false: '#E5E7EB', true: '#9C88FF' }}
                thumbColor="#FFFFFF"
              />
            </TouchableOpacity>

            <TouchableOpacity style={styles.settingItem}>
              <View style={styles.settingLeft}>
                <Calendar size={24} color="#9C88FF" />
                <Text style={styles.settingText}>Reminder Schedule</Text>
              </View>
              <ChevronRight size={20} color="#9CA3AF" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.settingItem}>
              <View style={styles.settingLeft}>
                <TrendingUp size={24} color="#9C88FF" />
                <Text style={styles.settingText}>Progress Insights</Text>
              </View>
              <ChevronRight size={20} color="#9CA3AF" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.settingItem}>
              <View style={styles.settingLeft}>
                <Settings size={24} color="#9C88FF" />
                <Text style={styles.settingText}>General Settings</Text>
              </View>
              <ChevronRight size={20} color="#9CA3AF" />
            </TouchableOpacity>
          </View>

          {/* Support Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Support</Text>
            
            <TouchableOpacity style={styles.settingItem}>
              <View style={styles.settingLeft}>
                <Heart size={24} color="#FFB6C1" />
                <Text style={styles.settingText}>Send Feedback</Text>
              </View>
              <ChevronRight size={20} color="#9CA3AF" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.settingItem}>
              <View style={styles.settingLeft}>
                <User size={24} color="#87CEEB" />
                <Text style={styles.settingText}>Contact Support</Text>
              </View>
              <ChevronRight size={20} color="#9CA3AF" />
            </TouchableOpacity>
          </View>
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
  profileHeader: {
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 32,
  },
  profileGradient: {
    borderRadius: 20,
    padding: 24,
    elevation: 8,
    shadowColor: '#9C88FF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
  },
  profileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  avatarContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  userJoinDate: {
    fontSize: 16,
    color: '#FFFFFF',
    opacity: 0.8,
  },
  profileStats: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    color: '#FFFFFF',
    opacity: 0.8,
  },
  statDivider: {
    width: 1,
    height: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    marginHorizontal: 20,
  },
  section: {
    paddingHorizontal: 24,
    marginBottom: 32,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1F2937',
  },
  sectionAction: {
    padding: 8,
  },
  goalCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  goalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  goalTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
  },
  goalTarget: {
    fontSize: 14,
    color: '#6B7280',
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  progressBar: {
    flex: 1,
    height: 8,
    backgroundColor: '#F3F4F6',
    borderRadius: 4,
    marginRight: 12,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#9C88FF',
    borderRadius: 4,
  },
  progressText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#9C88FF',
    minWidth: 35,
  },
  achievementsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  achievementCard: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    alignItems: 'center',
    position: 'relative',
  },
  achievementLocked: {
    opacity: 0.5,
  },
  achievementIcon: {
    fontSize: 32,
    marginBottom: 12,
  },
  achievementIconLocked: {
    opacity: 0.3,
  },
  achievementTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1F2937',
    textAlign: 'center',
  },
  achievementTitleLocked: {
    color: '#9CA3AF',
  },
  unlockedBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  settingText: {
    fontSize: 16,
    color: '#1F2937',
    marginLeft: 16,
    fontWeight: '500',
  },
});