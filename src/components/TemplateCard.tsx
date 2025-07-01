
import React from 'react';
import { Eye, Edit, Star, Download, Crown, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';

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

interface TemplateCardProps {
  template: Template;
  viewMode: 'grid' | 'list';
  onView: () => void;
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

const TemplateCard: React.FC<TemplateCardProps> = ({ template, viewMode, onView }) => {
  if (viewMode === 'list') {
    return (
      <Card className="hover:shadow-lg transition-all duration-300 bg-white/80 backdrop-blur-sm border-0 shadow-sm hover:shadow-xl hover:-translate-y-1">
        <div className="flex flex-col sm:flex-row">
          <div className="relative sm:w-48 h-32 sm:h-auto">
            <img 
              src={template.thumbnail} 
              alt={template.title}
              className="w-full h-full object-cover rounded-t-lg sm:rounded-l-lg sm:rounded-t-none"
            />
            {template.isPremium && (
              <Crown className="absolute top-2 right-2 h-5 w-5 text-yellow-500 bg-white rounded-full p-1" />
            )}
          </div>
          
          <div className="flex-1 p-6">
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="text-lg font-semibold text-gray-900 hover:text-blue-600 transition-colors">
                    {template.title}
                  </h3>
                  <Badge className={`text-xs ${getTypeColor(template.type)}`}>
                    {template.type}
                  </Badge>
                </div>
                
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                  {template.description}
                </p>
                
                <div className="flex flex-wrap gap-1 mb-3">
                  {template.tags.slice(0, 3).map(tag => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <div className="text-right ml-4">
                <div className="text-lg font-bold text-blue-600 mb-1">
                  {template.price === 0 ? '免费' : `¥${template.price}`}
                </div>
                <div className="flex items-center gap-1 text-sm text-gray-500 mb-1">
                  <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                  <span>{template.rating}</span>
                </div>
                <div className="flex items-center gap-1 text-sm text-gray-500">
                  <Download className="h-3 w-3" />
                  <span>{template.downloads}</span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Calendar className="h-3 w-3" />
                <span>by {template.author}</span>
              </div>
              
              <div className="flex gap-2">
                <Button size="sm" variant="outline" onClick={onView}>
                  <Eye className="h-4 w-4 mr-1" />
                  预览
                </Button>
                <Button size="sm" onClick={onView}>
                  <Edit className="h-4 w-4 mr-1" />
                  编辑
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card className="group hover:shadow-lg transition-all duration-300 bg-white/80 backdrop-blur-sm border-0 shadow-sm hover:shadow-xl hover:-translate-y-2">
      <CardHeader className="p-0 relative">
        <div className="relative overflow-hidden rounded-t-lg">
          <img 
            src={template.thumbnail} 
            alt={template.title}
            className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          {template.isPremium && (
            <Crown className="absolute top-3 right-3 h-5 w-5 text-yellow-500 bg-white rounded-full p-1" />
          )}
          
          <Badge className={`absolute top-3 left-3 ${getTypeColor(template.type)}`}>
            {template.type}
          </Badge>
          
          <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="flex gap-2">
              <Button size="sm" variant="secondary" onClick={onView}>
                <Eye className="h-4 w-4" />
              </Button>
              <Button size="sm" onClick={onView}>
                <Edit className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="p-4">
        <h3 className="font-semibold text-gray-900 mb-2 line-clamp-1 group-hover:text-blue-600 transition-colors">
          {template.title}
        </h3>
        
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {template.description}
        </p>
        
        <div className="flex flex-wrap gap-1 mb-3">
          {template.tags.slice(0, 2).map(tag => (
            <Badge key={tag} variant="outline" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
        
        <div className="flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center gap-1">
            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
            <span>{template.rating}</span>
          </div>
          <div className="flex items-center gap-1">
            <Download className="h-3 w-3" />
            <span>{template.downloads}</span>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="p-4 pt-0 flex items-center justify-between">
        <div className="text-sm text-gray-500">
          by {template.author}
        </div>
        <div className="font-bold text-blue-600">
          {template.price === 0 ? '免费' : `¥${template.price}`}
        </div>
      </CardFooter>
    </Card>
  );
};

export default TemplateCard;
