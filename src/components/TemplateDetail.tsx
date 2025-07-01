
import React, { useState } from 'react';
import { ArrowLeft, Star, Download, Heart, Share2, Crown, Calendar, User, Tag, Edit, Eye, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';

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

interface TemplateDetailProps {
  template: Template;
  onBack: () => void;
}

const getTypeColor = (type: string) => {
  switch (type) {
    case '纯PPT': return 'bg-blue-100 text-blue-800';
    case '纯文档': return 'bg-green-100 text-green-800';
    case '交互式HTML': return 'bg-purple-100 text-purple-800';
    case '框架图': return 'bg-orange-100 text-orange-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

const mockPreviewImages = [
  'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop',
];

const TemplateDetail: React.FC<TemplateDetailProps> = ({ template, onBack }) => {
  const [currentPreviewIndex, setCurrentPreviewIndex] = useState(0);
  const [isLiked, setIsLiked] = useState(false);

  const handleDownload = () => {
    console.log('下载模板:', template.id);
    // 这里可以添加实际的下载逻辑
  };

  const handleEdit = () => {
    console.log('编辑模板:', template.id);
    // 这里可以添加编辑器跳转逻辑
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" onClick={onBack} className="flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" />
                返回
              </Button>
              <h1 className="text-xl font-semibold text-gray-900">{template.title}</h1>
            </div>
            
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">
                <Share2 className="h-4 w-4 mr-1" />
                分享
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setIsLiked(!isLiked)}
                className={isLiked ? 'text-red-500' : ''}
              >
                <Heart className={`h-4 w-4 mr-1 ${isLiked ? 'fill-current' : ''}`} />
                收藏
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Preview */}
          <div className="lg:col-span-2 space-y-6">
            {/* Main Preview */}
            <Card className="overflow-hidden bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <div className="relative">
                <img 
                  src={mockPreviewImages[currentPreviewIndex]} 
                  alt={`预览 ${currentPreviewIndex + 1}`}
                  className="w-full h-96 object-cover"
                />
                {template.isPremium && (
                  <Crown className="absolute top-4 right-4 h-6 w-6 text-yellow-500 bg-white rounded-full p-1" />
                )}
              </div>
              
              {/* Thumbnail Navigation */}
              <div className="p-4 flex gap-2 overflow-x-auto">
                {mockPreviewImages.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentPreviewIndex(index)}
                    className={`flex-shrink-0 w-20 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                      currentPreviewIndex === index 
                        ? 'border-blue-500 ring-2 ring-blue-200' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <img src={img} alt={`缩略图 ${index + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </Card>

            {/* Tabs */}
            <Tabs defaultValue="description" className="w-full">
              <TabsList className="grid w-full grid-cols-3 bg-white/80 backdrop-blur-sm">
                <TabsTrigger value="description">详细介绍</TabsTrigger>
                <TabsTrigger value="specs">技术规格</TabsTrigger>
                <TabsTrigger value="reviews">用户评价</TabsTrigger>
              </TabsList>
              
              <TabsContent value="description" className="mt-6">
                <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle>模板介绍</CardTitle>
                  </CardHeader>
                  <CardContent className="prose max-w-none">
                    <p className="text-gray-700 leading-relaxed mb-4">
                      {template.description}
                    </p>
                    <p className="text-gray-700 leading-relaxed mb-4">
                      这是一个专业设计的{template.type}模板，适用于{template.category}场景。
                      模板经过精心设计，确保视觉效果和实用性的完美结合。
                    </p>
                    <ul className="list-disc pl-6 space-y-2 text-gray-700">
                      <li>专业的设计风格，符合现代审美</li>
                      <li>完整的内容结构，可直接使用</li>
                      <li>支持自定义修改和个性化调整</li>
                      <li>兼容主流办公软件和浏览器</li>
                    </ul>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="specs" className="mt-6">
                <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle>技术规格</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-gray-600">文件格式:</span>
                          <span className="font-medium">{template.type}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">文件大小:</span>
                          <span className="font-medium">约 5.2 MB</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">兼容性:</span>
                          <span className="font-medium">Office 2016+</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">语言:</span>
                          <span className="font-medium">中文</span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-gray-600">页面数量:</span>
                          <span className="font-medium">25 页</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">分辨率:</span>
                          <span className="font-medium">1920x1080</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">更新时间:</span>
                          <span className="font-medium">{template.createdAt}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">版权:</span>
                          <span className="font-medium">商用授权</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="reviews" className="mt-6">
                <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      用户评价
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-medium">{template.rating}</span>
                        <span className="text-sm text-gray-500">(128 评价)</span>
                      </div>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {[1, 2, 3].map((_, index) => (
                      <div key={index} className="border-b border-gray-100 pb-4 last:border-b-0">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
                              U{index + 1}
                            </div>
                            <span className="font-medium">用户{index + 1}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star key={star} className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                            ))}
                          </div>
                        </div>
                        <p className="text-gray-700 text-sm">
                          非常棒的模板，设计很专业，内容也很完整。使用后效果很好，推荐给大家！
                        </p>
                        <span className="text-xs text-gray-500">2024-01-{20 + index}</span>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Right Column - Info & Actions */}
          <div className="space-y-6">
            {/* Price & Actions */}
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="text-center mb-6">
                  <div className="text-3xl font-bold text-blue-600 mb-2">
                    {template.price === 0 ? '免费' : `¥${template.price}`}
                  </div>
                  {template.isPremium && (
                    <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white">
                      <Crown className="h-3 w-3 mr-1" />
                      精品模板
                    </Badge>
                  )}
                </div>
                
                <div className="space-y-3">
                  <Button className="w-full" size="lg" onClick={handleDownload}>
                    <Download className="h-4 w-4 mr-2" />
                    {template.price === 0 ? '免费下载' : '立即购买'}
                  </Button>
                  <Button variant="outline" className="w-full" size="lg" onClick={handleEdit}>
                    <Edit className="h-4 w-4 mr-2" />
                    在线编辑
                  </Button>
                  <Button variant="ghost" className="w-full" size="lg">
                    <Eye className="h-4 w-4 mr-2" />
                    在线预览
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Template Info */}
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle>模板信息</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 flex items-center gap-2">
                    <Tag className="h-4 w-4" />
                    类型
                  </span>
                  <Badge className={getTypeColor(template.type)}>
                    {template.type}
                  </Badge>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 flex items-center gap-2">
                    <User className="h-4 w-4" />
                    作者
                  </span>
                  <span className="font-medium">{template.author}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    创建时间
                  </span>
                  <span className="font-medium">{template.createdAt}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 flex items-center gap-2">
                    <Download className="h-4 w-4" />
                    下载量
                  </span>
                  <span className="font-medium">{template.downloads.toLocaleString()}</span>
                </div>
                
                <Separator />
                
                <div>
                  <span className="text-gray-600 text-sm mb-2 block">标签</span>
                  <div className="flex flex-wrap gap-1">
                    {template.tags.map(tag => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Related Templates */}
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle>相关模板</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {[1, 2, 3].map((_, index) => (
                  <div key={index} className="flex gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
                    <img 
                      src={`https://images.unsplash.com/photo-${1460925895917 + index}-afdab827c52f?w=60&h=40&fit=crop`}
                      alt={`相关模板 ${index + 1}`}
                      className="w-12 h-8 rounded object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium text-gray-900 truncate">
                        相关模板 {index + 1}
                      </div>
                      <div className="text-xs text-gray-500">
                        ¥{(index + 1) * 15}
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TemplateDetail;
