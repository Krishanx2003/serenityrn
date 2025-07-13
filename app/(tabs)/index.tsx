import { Inter_400Regular, Inter_600SemiBold, Inter_700Bold, useFonts } from '@expo-google-fonts/inter';
import { LinearGradient } from 'expo-linear-gradient';
import { ChevronRight, Star } from 'lucide-react-native';
import { useState } from 'react';
import {
  Dimensions,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming
} from 'react-native-reanimated';

const { width } = Dimensions.get('window');

const AFFIRMATIONS = [
  "You are worthy of love and respect exactly as you are.",
  "Your potential is limitless and your journey is unique.",
  "Every breath you take fills you with peace and calm.",
  "You have the strength to overcome any challenge.",
  "Today is a new opportunity to grow and flourish.",
  "You radiate positivity and attract good things.",
  "Your mind is clear, your heart is open, your spirit is free.",
  "You are exactly where you need to be in this moment.",
];

const QUICK_ACTIONS = [
  { title: 'Morning Meditation', duration: '10 min', icon: '🧘‍♀️', color: '#87CEEB' },
  { title: 'Breathing Exercise', duration: '5 min', icon: '🌬️', color: '#98D8C8' },
  { title: 'Gratitude Practice', duration: '3 min', icon: '🙏', color: '#FFB6C1' },
  { title: 'Body Scan', duration: '15 min', icon: '✨', color: '#DDA0DD' },
];

export default function HomeScreen() {
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_600SemiBold,
    Inter_700Bold,
  });

  const [currentAffirmation, setCurrentAffirmation] = useState(0);
  const [favorites, setFavorites] = useState<number[]>([]);
  const fadeAnim = useSharedValue(1);
  const scaleAnim = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: fadeAnim.value,
      transform: [{ scale: scaleAnim.value }],
    };
  });

  const nextAffirmation = () => {
    fadeAnim.value = withTiming(0, { duration: 150 }, () => {
      setCurrentAffirmation((prev) => (prev + 1) % AFFIRMATIONS.length);
      fadeAnim.value = withTiming(1, { duration: 150 });
    });
  };

  const toggleFavorite = () => {
    scaleAnim.value = withSpring(1.2, { duration: 100 }, () => {
      scaleAnim.value = withSpring(1, { duration: 100 });
    });
    
    setFavorites(prev => 
      prev.includes(currentAffirmation)
        ? prev.filter(id => id !== currentAffirmation)
        : [...prev, currentAffirmation]
    );
  };

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#F8F9FF', '#F0F4FF', '#E8F0FE']}
        style={styles.gradient}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.greeting}>Good Morning</Text>
            <Text style={styles.subtitle}>How are you feeling today?</Text>
          </View>

          {/* Daily Affirmation Card */}
          <View style={styles.affirmationSection}>
            <Text style={styles.sectionTitle}>Daily Affirmation</Text>
            <TouchableOpacity 
              style={styles.affirmationCard}
              onPress={nextAffirmation}
              activeOpacity={0.9}>
              <LinearGradient
                colors={['#9C88FF', '#7B68EE']}
                style={styles.affirmationGradient}>
                <Animated.View style={[styles.affirmationContent, animatedStyle]}>
                  <Text style={styles.affirmationText}>
                    {AFFIRMATIONS[currentAffirmation]}
                  </Text>
                </Animated.View>
                <View style={styles.affirmationActions}>
                  <TouchableOpacity 
                    style={styles.favoriteButton}
                    onPress={toggleFavorite}>
                    <Animated.View style={animatedStyle}>
                      <Star 
                        size={24} 
                        color={favorites.includes(currentAffirmation) ? '#FFD700' : '#FFFFFF'} 
                        fill={favorites.includes(currentAffirmation) ? '#FFD700' : 'transparent'}
                      />
                    </Animated.View>
                  </TouchableOpacity>
                  <Text style={styles.tapToChange}>Tap to change</Text>
                </View>
              </LinearGradient>
            </TouchableOpacity>
          </View>

          {/* Quick Actions */}
          <View style={styles.quickActionsSection}>
            <Text style={styles.sectionTitle}>Quick Start</Text>
            <View style={styles.quickActionsGrid}>
              {QUICK_ACTIONS.map((action, index) => (
                <TouchableOpacity 
                  key={index} 
                  style={styles.quickActionCard}
                  activeOpacity={0.8}>
                  <LinearGradient
                    colors={[action.color, action.color + '80']}
                    style={styles.quickActionGradient}>
                    <Text style={styles.quickActionIcon}>{action.icon}</Text>
                    <Text style={styles.quickActionTitle}>{action.title}</Text>
                    <Text style={styles.quickActionDuration}>{action.duration}</Text>
                  </LinearGradient>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Today's Focus */}
          <View style={styles.focusSection}>
            <Text style={styles.sectionTitle}>Today's Focus</Text>
            <TouchableOpacity style={styles.focusCard} activeOpacity={0.8}>
              <LinearGradient
                colors={['#FFB6C1', '#FFC0CB']}
                style={styles.focusGradient}>
                <View style={styles.focusContent}>
                  <Text style={styles.focusTitle}>Mindful Breathing</Text>
                  <Text style={styles.focusDescription}>
                    Take a moment to focus on your breath and center yourself
                  </Text>
                  <View style={styles.focusAction}>
                    <Text style={styles.focusActionText}>Start Session</Text>
                    <ChevronRight size={20} color="#FFFFFF" />
                  </View>
                </View>
              </LinearGradient>
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
  header: {
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 32,
  },
  greeting: {
    fontSize: 32,
    fontFamily: 'Inter_700Bold',
    color: '#1F2937',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: 'Inter_400Regular',
    color: '#6B7280',
  },
  affirmationSection: {
    paddingHorizontal: 24,
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: 'Inter_600SemiBold',
    color: '#1F2937',
    marginBottom: 16,
  },
  affirmationCard: {
    borderRadius: 20,
    overflow: 'hidden',
    elevation: 8,
    shadowColor: '#9C88FF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
  },
  affirmationGradient: {
    padding: 24,
    minHeight: 160,
    justifyContent: 'center',
  },
  affirmationContent: {
    flex: 1,
    justifyContent: 'center',
  },
  affirmationText: {
    fontSize: 18,
    fontFamily: 'Inter_600SemiBold',
    color: '#FFFFFF',
    textAlign: 'center',
    lineHeight: 26,
  },
  affirmationActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
  },
  favoriteButton: {
    padding: 8,
  },
  tapToChange: {
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    color: '#FFFFFF',
    opacity: 0.8,
  },
  quickActionsSection: {
    paddingHorizontal: 24,
    marginBottom: 32,
  },
  quickActionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  quickActionCard: {
    width: (width - 60) / 2,
    marginBottom: 16,
    borderRadius: 16,
    overflow: 'hidden',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
  },
  quickActionGradient: {
    padding: 20,
    alignItems: 'center',
    minHeight: 120,
    justifyContent: 'center',
  },
  quickActionIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  quickActionTitle: {
    fontSize: 14,
    fontFamily: 'Inter_600SemiBold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 4,
  },
  quickActionDuration: {
    fontSize: 12,
    fontFamily: 'Inter_400Regular',
    color: '#FFFFFF',
    opacity: 0.9,
  },
  focusSection: {
    paddingHorizontal: 24,
    marginBottom: 32,
  },
  focusCard: {
    borderRadius: 16,
    overflow: 'hidden',
    elevation: 6,
    shadowColor: '#FFB6C1',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
  },
  focusGradient: {
    padding: 20,
  },
  focusContent: {
    alignItems: 'flex-start',
  },
  focusTitle: {
    fontSize: 18,
    fontFamily: 'Inter_600SemiBold',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  focusDescription: {
    fontSize: 14,
    fontFamily: 'Inter_400Regular',
    color: '#FFFFFF',
    opacity: 0.9,
    marginBottom: 16,
    lineHeight: 20,
  },
  focusAction: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  focusActionText: {
    fontSize: 16,
    fontFamily: 'Inter_600SemiBold',
    color: '#FFFFFF',
    marginRight: 8,
  },
});