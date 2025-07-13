import { LinearGradient } from 'expo-linear-gradient';
import { Plus, TrendingUp } from 'lucide-react-native';
import { useState } from 'react';
import {
  FlatList,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

const MOOD_OPTIONS = [
  { emoji: '😊', label: 'Great', color: '#98D8C8', value: 5 },
  { emoji: '🙂', label: 'Good', color: '#87CEEB', value: 4 },
  { emoji: '😐', label: 'Okay', color: '#F0E68C', value: 3 },
  { emoji: '😔', label: 'Down', color: '#FFB6C1', value: 2 },
  { emoji: '😢', label: 'Sad', color: '#DDA0DD', value: 1 },
];

const JOURNAL_PROMPTS = [
  "What are three things you're grateful for today?",
  "Describe a moment that made you smile recently.",
  "What's one challenge you overcame this week?",
  "How did you practice self-care today?",
  "What's something new you learned about yourself?",
  "What would you tell your past self from a year ago?",
];

const SAMPLE_ENTRIES = [
  {
    id: 1,
    date: '2024-01-15',
    mood: 4,
    title: 'Morning meditation',
    preview: 'Started my day with a 10-minute meditation session...',
    content: 'Started my day with a 10-minute meditation session. Feeling much more centered and ready to tackle the day ahead.',
  },
  {
    id: 2,
    date: '2024-01-14',
    mood: 5,
    title: 'Great day with friends',
    preview: 'Spent the afternoon with close friends...',
    content: 'Spent the afternoon with close friends. Their laughter and support reminded me how blessed I am to have such wonderful people in my life.',
  },
  {
    id: 3,
    date: '2024-01-13',
    mood: 3,
    title: 'Challenging but growth-oriented',
    preview: 'Today was tough, but I learned something valuable...',
    content: 'Today was tough, but I learned something valuable about resilience. Every challenge is an opportunity to grow stronger.',
  },
];

export default function JournalScreen() {
  const [selectedMood, setSelectedMood] = useState<number | null>(null);
  const [journalText, setJournalText] = useState('');
  const [currentPrompt, setCurrentPrompt] = useState(JOURNAL_PROMPTS[0]);
  const [showNewEntry, setShowNewEntry] = useState(false);

  const getMoodEmoji = (value: number) => {
    const mood = MOOD_OPTIONS.find(m => m.value === value);
    return mood ? mood.emoji : '😐';
  };

  const getMoodColor = (value: number) => {
    const mood = MOOD_OPTIONS.find(m => m.value === value);
    return mood ? mood.color : '#F0E68C';
  };

  const renderMoodOption = (mood: typeof MOOD_OPTIONS[0]) => (
    <TouchableOpacity
      key={mood.value}
      style={[
        styles.moodOption,
        selectedMood === mood.value && styles.moodOptionSelected,
        { borderColor: mood.color }
      ]}
      onPress={() => setSelectedMood(mood.value)}>
      <Text style={styles.moodEmoji}>{mood.emoji}</Text>
      <Text style={styles.moodLabel}>{mood.label}</Text>
    </TouchableOpacity>
  );

  const renderJournalEntry = ({ item }: { item: typeof SAMPLE_ENTRIES[0] }) => (
    <TouchableOpacity style={styles.entryCard} activeOpacity={0.8}>
      <LinearGradient
        colors={[getMoodColor(item.mood), getMoodColor(item.mood) + '80']}
        style={styles.entryGradient}>
        <View style={styles.entryHeader}>
          <View style={styles.entryMood}>
            <Text style={styles.entryMoodEmoji}>{getMoodEmoji(item.mood)}</Text>
          </View>
          <Text style={styles.entryDate}>{item.date}</Text>
        </View>
        <Text style={styles.entryTitle}>{item.title}</Text>
        <Text style={styles.entryPreview}>{item.preview}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );

  if (showNewEntry) {
    return (
      <SafeAreaView style={styles.container}>
        <LinearGradient
          colors={['#F8F9FF', '#F0F4FF']}
          style={styles.gradient}>
          
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity 
              style={styles.backButton}
              onPress={() => setShowNewEntry(false)}>
              <Text style={styles.backButtonText}>Cancel</Text>
            </TouchableOpacity>
            <Text style={styles.headerTitle}>New Entry</Text>
            <TouchableOpacity style={styles.saveButton}>
              <Text style={styles.saveButtonText}>Save</Text>
            </TouchableOpacity>
          </View>

          <ScrollView contentContainerStyle={styles.newEntryContent}>
            {/* Mood Selection */}
            <View style={styles.moodSection}>
              <Text style={styles.sectionTitle}>How are you feeling?</Text>
              <View style={styles.moodOptions}>
                {MOOD_OPTIONS.map(renderMoodOption)}
              </View>
            </View>

            {/* Journal Prompt */}
            <View style={styles.promptSection}>
              <Text style={styles.sectionTitle}>Today's Prompt</Text>
              <TouchableOpacity 
                style={styles.promptCard}
                onPress={() => {
                  const randomIndex = Math.floor(Math.random() * JOURNAL_PROMPTS.length);
                  setCurrentPrompt(JOURNAL_PROMPTS[randomIndex]);
                }}>
                <Text style={styles.promptText}>{currentPrompt}</Text>
                <Text style={styles.promptHint}>Tap to change prompt</Text>
              </TouchableOpacity>
            </View>

            {/* Journal Input */}
            <View style={styles.journalSection}>
              <Text style={styles.sectionTitle}>Your thoughts</Text>
              <TextInput
                style={styles.journalInput}
                multiline
                placeholder="Start writing..."
                placeholderTextColor="#9CA3AF"
                value={journalText}
                onChangeText={setJournalText}
                textAlignVertical="top"
              />
            </View>
          </ScrollView>
        </LinearGradient>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#F8F9FF', '#F0F4FF']}
        style={styles.gradient}>
        
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.headerTitle}>Journal</Text>
            <Text style={styles.headerSubtitle}>Track your journey</Text>
          </View>
          <TouchableOpacity 
            style={styles.addButton}
            onPress={() => setShowNewEntry(true)}>
            <Plus size={24} color="#FFFFFF" />
          </TouchableOpacity>
        </View>

        {/* Stats */}
        <View style={styles.statsSection}>
          <View style={styles.statsCard}>
            <LinearGradient
              colors={['#9C88FF', '#7B68EE']}
              style={styles.statsGradient}>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>12</Text>
                <Text style={styles.statLabel}>Entries this month</Text>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>4.2</Text>
                <Text style={styles.statLabel}>Average mood</Text>
              </View>
              <TouchableOpacity style={styles.trendButton}>
                <TrendingUp size={20} color="#FFFFFF" />
              </TouchableOpacity>
            </LinearGradient>
          </View>
        </View>

        {/* Recent Entries */}
        <View style={styles.entriesSection}>
          <Text style={styles.sectionTitle}>Recent Entries</Text>
          <FlatList
            data={SAMPLE_ENTRIES}
            renderItem={renderJournalEntry}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={styles.entriesList}
            showsVerticalScrollIndicator={false}
          />
        </View>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 24,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1F2937',
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#6B7280',
    marginTop: 2,
  },
  addButton: {
    backgroundColor: '#9C88FF',
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#9C88FF',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  backButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  backButtonText: {
    fontSize: 16,
    color: '#9C88FF',
    fontWeight: '600',
  },
  saveButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: '#9C88FF',
    borderRadius: 12,
  },
  saveButtonText: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  statsSection: {
    paddingHorizontal: 24,
    marginBottom: 32,
  },
  statsCard: {
    borderRadius: 16,
    overflow: 'hidden',
    elevation: 6,
    shadowColor: '#9C88FF',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
  },
  statsGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
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
    opacity: 0.9,
    textAlign: 'center',
  },
  statDivider: {
    width: 1,
    height: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    marginHorizontal: 20,
  },
  trendButton: {
    padding: 8,
  },
  entriesSection: {
    flex: 1,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 16,
  },
  entriesList: {
    paddingBottom: 100,
  },
  entryCard: {
    marginBottom: 16,
    borderRadius: 16,
    overflow: 'hidden',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  entryGradient: {
    padding: 16,
  },
  entryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  entryMood: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  entryMoodEmoji: {
    fontSize: 20,
  },
  entryDate: {
    fontSize: 14,
    color: '#FFFFFF',
    opacity: 0.8,
  },
  entryTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  entryPreview: {
    fontSize: 14,
    color: '#FFFFFF',
    opacity: 0.9,
    lineHeight: 20,
  },
  newEntryContent: {
    paddingHorizontal: 24,
    paddingBottom: 100,
  },
  moodSection: {
    marginBottom: 32,
  },
  moodOptions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  moodOption: {
    alignItems: 'center',
    padding: 12,
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: 'transparent',
    flex: 1,
    marginHorizontal: 4,
  },
  moodOptionSelected: {
    borderColor: '#9C88FF',
    backgroundColor: '#F3F0FF',
  },
  moodEmoji: {
    fontSize: 24,
    marginBottom: 8,
  },
  moodLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#6B7280',
  },
  promptSection: {
    marginBottom: 32,
  },
  promptCard: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  promptText: {
    fontSize: 16,
    color: '#1F2937',
    lineHeight: 24,
    marginBottom: 8,
  },
  promptHint: {
    fontSize: 14,
    color: '#9C88FF',
    fontStyle: 'italic',
  },
  journalSection: {
    marginBottom: 32,
  },
  journalInput: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    fontSize: 16,
    color: '#1F2937',
    minHeight: 200,
    lineHeight: 24,
  },
});