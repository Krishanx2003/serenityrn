import { LinearGradient } from 'expo-linear-gradient';
import { Clock, Filter, Play, Star } from 'lucide-react-native';
import { useState } from 'react';
import {
    FlatList,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

const CATEGORIES = ['All', 'Relax', 'Energy', 'Sleep', 'Focus', 'Anxiety'];

const MEDITATION_VIDEOS = [
  {
    id: 1,
    title: 'Morning Sunrise Meditation',
    duration: '10 min',
    category: 'Energy',
    instructor: 'Sarah Chen',
    rating: 4.8,
    color: '#FFB6C1',
    description: 'Start your day with renewed energy and focus',
  },
  {
    id: 2,
    title: 'Deep Sleep Journey',
    duration: '20 min',
    category: 'Sleep',
    instructor: 'Mark Johnson',
    rating: 4.9,
    color: '#9C88FF',
    description: 'Gentle guidance into peaceful, restorative sleep',
  },
  {
    id: 3,
    title: 'Stress Relief Breathing',
    duration: '5 min',
    category: 'Relax',
    instructor: 'Emma Wilson',
    rating: 4.7,
    color: '#87CEEB',
    description: 'Quick breathing exercises to melt away tension',
  },
  {
    id: 4,
    title: 'Mindful Body Scan',
    duration: '15 min',
    category: 'Relax',
    instructor: 'David Lee',
    rating: 4.8,
    color: '#98D8C8',
    description: 'Progressive relaxation from head to toe',
  },
  {
    id: 5,
    title: 'Focus & Concentration',
    duration: '12 min',
    category: 'Focus',
    instructor: 'Lisa Park',
    rating: 4.6,
    color: '#DDA0DD',
    description: 'Enhance your mental clarity and focus',
  },
  {
    id: 6,
    title: 'Anxiety Release',
    duration: '8 min',
    category: 'Anxiety',
    instructor: 'Tom Brown',
    rating: 4.9,
    color: '#F0E68C',
    description: 'Calm your mind and release anxious thoughts',
  },
];

export default function MeditationScreen() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [favorites, setFavorites] = useState<number[]>([]);

  const filteredVideos = selectedCategory === 'All' 
    ? MEDITATION_VIDEOS 
    : MEDITATION_VIDEOS.filter(video => video.category === selectedCategory);

  const toggleFavorite = (id: number) => {
    setFavorites(prev => 
      prev.includes(id) 
        ? prev.filter(favId => favId !== id)
        : [...prev, id]
    );
  };

  const renderVideoCard = ({ item }: { item: typeof MEDITATION_VIDEOS[0] }) => (
    <TouchableOpacity style={styles.videoCard} activeOpacity={0.8}>
      <LinearGradient
        colors={[item.color, item.color + '80']}
        style={styles.videoGradient}>
        <View style={styles.videoHeader}>
          <View style={styles.categoryBadge}>
            <Text style={styles.categoryText}>{item.category}</Text>
          </View>
          <TouchableOpacity 
            style={styles.favoriteBtn}
            onPress={() => toggleFavorite(item.id)}>
            <Star 
              size={20} 
              color={favorites.includes(item.id) ? '#FFD700' : '#FFFFFF'} 
              fill={favorites.includes(item.id) ? '#FFD700' : 'transparent'}
            />
          </TouchableOpacity>
        </View>
        
        <View style={styles.videoContent}>
          <Text style={styles.videoTitle}>{item.title}</Text>
          <Text style={styles.videoDescription}>{item.description}</Text>
          <Text style={styles.instructor}>with {item.instructor}</Text>
        </View>

        <View style={styles.videoFooter}>
          <View style={styles.videoMeta}>
            <View style={styles.metaItem}>
              <Clock size={16} color="#FFFFFF" />
              <Text style={styles.metaText}>{item.duration}</Text>
            </View>
            <View style={styles.metaItem}>
              <Star size={16} color="#FFD700" fill="#FFD700" />
              <Text style={styles.metaText}>{item.rating}</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.playButton}>
            <Play size={20} color="#FFFFFF" fill="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#F8F9FF', '#F0F4FF']}
        style={styles.gradient}>
        
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Meditation & Yoga</Text>
          <Text style={styles.headerSubtitle}>Find your inner peace</Text>
        </View>

        {/* Categories */}
        <View style={styles.categoriesSection}>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoriesContainer}>
            {CATEGORIES.map((category) => (
              <TouchableOpacity
                key={category}
                style={[
                  styles.categoryButton,
                  selectedCategory === category && styles.categoryButtonActive
                ]}
                onPress={() => setSelectedCategory(category)}>
                <Text style={[
                  styles.categoryButtonText,
                  selectedCategory === category && styles.categoryButtonTextActive
                ]}>
                  {category}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Filter Button */}
        <View style={styles.filterSection}>
          <TouchableOpacity style={styles.filterButton}>
            <Filter size={20} color="#9C88FF" />
            <Text style={styles.filterText}>Filter</Text>
          </TouchableOpacity>
        </View>

        {/* Videos List */}
        <FlatList
          data={filteredVideos}
          renderItem={renderVideoCard}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.videosList}
          showsVerticalScrollIndicator={false}
        />
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
    paddingBottom: 24,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#6B7280',
  },
  categoriesSection: {
    marginBottom: 20,
  },
  categoriesContainer: {
    paddingHorizontal: 24,
    paddingRight: 48,
  },
  categoryButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    marginRight: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  categoryButtonActive: {
    backgroundColor: '#9C88FF',
    borderColor: '#9C88FF',
  },
  categoryButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6B7280',
  },
  categoryButtonTextActive: {
    color: '#FFFFFF',
  },
  filterSection: {
    paddingHorizontal: 24,
    marginBottom: 16,
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-end',
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  filterText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#9C88FF',
    marginLeft: 8,
  },
  videosList: {
    paddingHorizontal: 24,
    paddingBottom: 100,
  },
  videoCard: {
    marginBottom: 20,
    borderRadius: 20,
    overflow: 'hidden',
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
  },
  videoGradient: {
    padding: 20,
  },
  videoHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  categoryBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  categoryText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  favoriteBtn: {
    padding: 8,
  },
  videoContent: {
    marginBottom: 20,
  },
  videoTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  videoDescription: {
    fontSize: 14,
    color: '#FFFFFF',
    opacity: 0.9,
    lineHeight: 20,
    marginBottom: 8,
  },
  instructor: {
    fontSize: 13,
    color: '#FFFFFF',
    opacity: 0.8,
    fontStyle: 'italic',
  },
  videoFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  videoMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  metaText: {
    fontSize: 14,
    color: '#FFFFFF',
    marginLeft: 6,
    fontWeight: '600',
  },
  playButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
});