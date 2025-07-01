
import React, { useState, useMemo } from 'react';
import { Search, Filter, Grid, List, Eye, Edit, Star, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import TemplateCard from '@/components/TemplateCard';
import TemplateDetail from '@/components/TemplateDetail';

interface Template {
  id: string;
  title: string;
  type: '纯PPT' | '纯文档' | '交互式HTML' | '框架图';
  category: string;
  description: string;
  thumbnail: string;
  author: string;
  rating: number;
  downloads: number;
  tags: string[];
  price: number;
  isPremium: boolean;
  createdAt: string;
}

const mockTemplates: Template[] = [
  {
    id: '1',
    title: '商业计划书模板',
    type: '纯PPT',
    category: '商业',
    description: '专业的商业计划书模板，包含市场分析、财务规划等完整内容',
    thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop',
    author: '设计师小王',
    rating: 4.8,
    downloads: 1234,
    tags: ['商业', '计划书', '融资'],
    price: 29,
    isPremium: true,
    createdAt: '2024-01-15'
  },
  {
    id: '2',
    title: '项目管理流程图',
    type: '框架图',
    category: '管理',
    description: '清晰的项目管理流程图，适用于各种项目管理场景',
    thumbnail: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&h=300&fit=crop',
    author: '项目经理李',
    rating: 4.6,
    downloads: 856,
    tags: ['项目管理', '流程图', '团队'],
    price: 0,
    isPremium: false,
    createdAt: '2024-01-20'
  },
  {
    id: '3',
    title: '交互式产品展示',
    type: '交互式HTML',
    category: '产品',
    description: '动态交互式产品展示页面，支持3D效果和动画',
    thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop',
    author: '前端开发张',
    rating: 4.9,
    downloads: 2103,
    tags: ['交互', '产品', '动画'],
    price: 59,
    isPremium: true,
    createdAt: '2024-01-10'
  },
  {
    id: '4',
    title: '年度总结报告',
    type: '纯文档',
    category: '报告',
    description: '专业的年度总结报告模板，包含数据分析和图表展示',
    thumbnail: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop',
    author: '文档专家刘',
    rating: 4.5,
    downloads: 673,
    tags: ['年度总结', '报告', '数据'],
    price: 19,
    isPremium: true,
    createdAt: '2024-01-25'
  },
  {
    id: '5',
    title: '系统架构设计图',
    type: '框架图',
    category: '技术',
    description: '完整的系统架构设计图模板，适用于软件系统设计',
    thumbnail: 'https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=400&h=300&fit=crop',
    author: '架构师陈',
    rating: 4.7,
    downloads: 945,
    tags: ['架构', '系统设计', '技术'],
    price: 0,
    isPremium: false,
    createdAt: '2024-01-18'
  },
  {
    id: '6',
    title: '营销策划方案',
    type: '纯PPT',
    category: '营销',
    description: '全面的营销策划方案模板，包含策略分析和执行计划',
    thumbnail: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=400&h=300&fit=crop',
    author: '营销总监赵',
    rating: 4.4,
    downloads: 1567,
    tags: ['营销', '策划', '方案'],
    price: 39,
    isPremium: true,
    createdAt: '2024-01-12'
  }
];

const Index = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<string>('全部');
  const [selectedCategory, setSelectedCategory] = useState<string>('全部');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);

  const filteredTemplates = useMemo(() => {
    return mockTemplates.filter(template => {
      const matchesSearch = template.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           template.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           template.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesType = selectedType === '全部' || template.type === selectedType;
      const matchesCategory = selectedCategory === '全部' || template.category === selectedCategory;
      
      return matchesSearch && matchesType && matchesCategory;
    });
  }, [searchTerm, selectedType, selectedCategory]);

  const categories = ['全部', ...Array.from(new Set(mockTemplates.map(t => t.category)))];
  const types = ['全部', ...Array.from(new Set(mockTemplates.map(t => t.type)))];

  if (selectedTemplate) {
    return (
      <TemplateDetail 
        template={selectedTemplate} 
        onBack={() => setSelectedTemplate(null)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                模板市场
              </h1>
              <Badge variant="secondary" className="hidden sm:block">
                {filteredTemplates.length} 个模板
              </Badge>
            </div>
            
            <div className="flex items-center space-x-2">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('grid')}
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('list')}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="搜索模板..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-white/80 backdrop-blur-sm"
              />
            </div>
            
            <div className="flex gap-2">
              <Select value={selectedType} onValueChange={setSelectedType}>
                <SelectTrigger className="w-32 bg-white/80 backdrop-blur-sm">
                  <SelectValue placeholder="类型" />
                </SelectTrigger>
                <SelectContent>
                  {types.map(type => (
                    <SelectItem key={type} value={type}>{type}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-32 bg-white/80 backdrop-blur-sm">
                  <SelectValue placeholder="分类" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(category => (
                    <SelectItem key={category} value={category}>{category}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Templates Grid */}
        <div className={`grid gap-6 ${
          viewMode === 'grid' 
            ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
            : 'grid-cols-1'
        }`}>
          {filteredTemplates.map(template => (
            <TemplateCard
              key={template.id}
              template={template}
              viewMode={viewMode}
              onView={() => setSelectedTemplate(template)}
            />
          ))}
        </div>

        {filteredTemplates.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 text-lg mb-2">未找到匹配的模板</div>
            <div className="text-gray-500">尝试调整搜索条件或筛选器</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
