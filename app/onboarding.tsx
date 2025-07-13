import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { Check, ChevronLeft, ChevronRight } from 'lucide-react-native';
import { useRef, useState } from 'react';
import {
    Dimensions,
    FlatList,
    SafeAreaView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withTiming
} from 'react-native-reanimated';

const { width } = Dimensions.get('window');

const ONBOARDING_STEPS = [
  {
    id: 1,
    title: 'Welcome to Serenity',
    subtitle: 'Your journey to inner peace begins here',
    description: 'Discover daily affirmations, guided meditations, and mindful practices designed to nurture your wellbeing.',
    color: ['#9C88FF', '#7B68EE'],
    icon: '🧘‍♀️',
  },
  {
    id: 2,
    title: 'Track Your Mood',
    subtitle: 'Understanding leads to healing',
    description: 'Journal your thoughts and track your emotional journey with our intuitive mood tracking system.',
    color: ['#87CEEB', '#4682B4'],
    icon: '💫',
  },
  {
    id: 3,
    title: 'Build Healthy Habits',
    subtitle: 'Small steps, big changes',
    description: 'Create lasting wellness habits with personalized reminders and progress tracking.',
    color: ['#98D8C8', '#20B2AA'],
    icon: '🌱',
  },
  {
    id: 4,
    title: 'Choose Your Theme',
    subtitle: 'Personalize your experience',
    description: 'Select a visual theme that resonates with your inner self.',
    color: ['#FFB6C1', '#FF69B4'],
    icon: '🎨',
  },
  {
    id: 5,
    title: 'Set Your Goals',
    subtitle: 'Define your wellness journey',
    description: 'Choose the areas of wellbeing you\'d like to focus on.',
    color: ['#DDA0DD', '#DA70D6'],
    icon: '🎯',
  },
];

const THEME_OPTIONS = [
  { id: 1, name: 'Calm Ocean', colors: ['#87CEEB', '#4682B4'], selected: true },
  { id: 2, name: 'Forest Green', colors: ['#98D8C8', '#20B2AA'], selected: false },
  { id: 3, name: 'Sunset Blush', colors: ['#FFB6C1', '#FF69B4'], selected: false },
  { id: 4, name: 'Lavender Dreams', colors: ['#DDA0DD', '#DA70D6'], selected: false },
];

const WELLNESS_GOALS = [
  { id: 1, title: 'Daily Meditation', icon: '🧘', selected: false },
  { id: 2, title: 'Mood Tracking', icon: '📝', selected: false },
  { id: 3, title: 'Gratitude Practice', icon: '🙏', selected: false },
  { id: 4, title: 'Mindful Breathing', icon: '🌬️', selected: false },
  { id: 5, title: 'Better Sleep', icon: '😴', selected: false },
  { id: 6, title: 'Stress Relief', icon: '✨', selected: false },
];

export default function OnboardingScreen() {
  const [currentStep, setCurrentStep] = useState(0);
  const [themes, setThemes] = useState(THEME_OPTIONS);
  const [goals, setGoals] = useState(WELLNESS_GOALS);
  const flatListRef = useRef<FlatList>(null);
  const progressValue = useSharedValue(0);

  const progressStyle = useAnimatedStyle(() => {
    return {
      width: withTiming(`${((currentStep + 1) / ONBOARDING_STEPS.length) * 100}%`, {
        duration: 300,
      }),
    };
  });

  const nextStep = () => {
    if (currentStep < ONBOARDING_STEPS.length - 1) {
      const newStep = currentStep + 1;
      setCurrentStep(newStep);
      flatListRef.current?.scrollToIndex({ index: newStep, animated: true });
    } else {
      // Complete onboarding and navigate to main app
      router.replace('/(tabs)');
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      const newStep = currentStep - 1;
      setCurrentStep(newStep);
      flatListRef.current?.scrollToIndex({ index: newStep, animated: true });
    }
  };

  const selectTheme = (themeId: number) => {
    setThemes(themes.map(theme => ({
      ...theme,
      selected: theme.id === themeId,
    })));
  };

  const toggleGoal = (goalId: number) => {
    setGoals(goals.map(goal => ({
      ...goal,
      selected: goal.id === goalId ? !goal.selected : goal.selected,
    })));
  };

  const renderStep = ({ item, index }: { item: typeof ONBOARDING_STEPS[0], index: number }) => {
    const step = ONBOARDING_STEPS[index];
    
    return (
      <View style={styles.stepContainer}>
        <LinearGradient
          colors={step.color as [string, string]}
          style={styles.stepGradient}>
          
          {/* Content */}
          <View style={styles.stepContent}>
            <Text style={styles.stepIcon}>{step.icon}</Text>
            <Text style={styles.stepTitle}>{step.title}</Text>
            <Text style={styles.stepSubtitle}>{step.subtitle}</Text>
            <Text style={styles.stepDescription}>{step.description}</Text>

            {/* Theme Selection */}
            {index === 3 && (
              <View style={styles.themeSelection}>
                {themes.map((theme) => (
                  <TouchableOpacity
                    key={theme.id}
                    style={[
                      styles.themeOption,
                      theme.selected && styles.themeOptionSelected,
                    ]}
                    onPress={() => selectTheme(theme.id)}>
                    <LinearGradient
                      colors={theme.colors as [string, string]}
                      style={styles.themePreview}>
                      {theme.selected && (
                        <Check size={20} color="#FFFFFF" />
                      )}
                    </LinearGradient>
                    <Text style={styles.themeName}>{theme.name}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}

            {/* Goals Selection */}
            {index === 4 && (
              <View style={styles.goalsSelection}>
                {goals.map((goal) => (
                  <TouchableOpacity
                    key={goal.id}
                    style={[
                      styles.goalOption,
                      goal.selected && styles.goalOptionSelected,
                    ]}
                    onPress={() => toggleGoal(goal.id)}>
                    <Text style={styles.goalIcon}>{goal.icon}</Text>
                    <Text style={[
                      styles.goalTitle,
                      goal.selected && styles.goalTitleSelected,
                    ]}>
                      {goal.title}
                    </Text>
                    {goal.selected && (
                      <View style={styles.goalCheck}>
                        <Check size={16} color="#FFFFFF" />
                      </View>
                    )}
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>
        </LinearGradient>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      {/* Progress Bar */}
      <View style={styles.progressContainer}>
        <View style={styles.progressBar}>
          <Animated.View style={[styles.progressFill, progressStyle]} />
        </View>
      </View>

      {/* Steps */}
      <FlatList
        ref={flatListRef}
        data={ONBOARDING_STEPS}
        renderItem={renderStep}
        keyExtractor={(item) => item.id.toString()}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        scrollEnabled={false}
        style={styles.stepsList}
      />

      {/* Navigation */}
      <View style={styles.navigation}>
        {currentStep > 0 && (
          <TouchableOpacity style={styles.navButton} onPress={prevStep}>
            <ChevronLeft size={24} color="#FFFFFF" />
          </TouchableOpacity>
        )}
        
        <View style={styles.stepIndicators}>
          {ONBOARDING_STEPS.map((_, index) => (
            <View
              key={index}
              style={[
                styles.stepIndicator,
                index === currentStep && styles.stepIndicatorActive,
              ]}
            />
          ))}
        </View>

        <TouchableOpacity style={styles.navButton} onPress={nextStep}>
          {currentStep === ONBOARDING_STEPS.length - 1 ? (
            <Check size={24} color="#FFFFFF" />
          ) : (
            <ChevronRight size={24} color="#FFFFFF" />
          )}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1F2937',
  },
  progressContainer: {
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 20,
  },
  progressBar: {
    height: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 2,
  },
  stepsList: {
    flex: 1,
  },
  stepContainer: {
    width,
    flex: 1,
  },
  stepGradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  stepContent: {
    alignItems: 'center',
    maxWidth: 320,
  },
  stepIcon: {
    fontSize: 80,
    marginBottom: 32,
  },
  stepTitle: {
    fontSize: 32,
    fontWeight: '700',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 16,
  },
  stepSubtitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 24,
    opacity: 0.9,
  },
  stepDescription: {
    fontSize: 16,
    color: '#FFFFFF',
    textAlign: 'center',
    lineHeight: 24,
    opacity: 0.8,
  },
  themeSelection: {
    marginTop: 40,
    width: '100%',
  },
  themeOption: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  themeOptionSelected: {
    borderColor: '#FFFFFF',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  themePreview: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  themeName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    flex: 1,
  },
  goalsSelection: {
    marginTop: 40,
    width: '100%',
  },
  goalOption: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: 'transparent',
    position: 'relative',
  },
  goalOptionSelected: {
    borderColor: '#FFFFFF',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  goalIcon: {
    fontSize: 24,
    marginRight: 16,
  },
  goalTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    flex: 1,
  },
  goalTitleSelected: {
    color: '#FFFFFF',
  },
  goalCheck: {
    backgroundColor: '#FFFFFF',
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  navigation: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingBottom: 40,
    paddingTop: 20,
  },
  navButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  stepIndicators: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  stepIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    marginHorizontal: 4,
  },
  stepIndicatorActive: {
    backgroundColor: '#FFFFFF',
    width: 24,
  },
});