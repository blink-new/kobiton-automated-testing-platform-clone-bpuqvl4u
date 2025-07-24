import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { 
  Brain, 
  Target, 
  Clock, 
  Zap, 
  CheckCircle, 
  TrendingUp,
  Eye,
  MousePointer
} from 'lucide-react'

interface Pattern {
  id: string
  name: string
  confidence: number
  description: string
  elements: number
  actions: string[]
  icon: React.ReactNode
  color: string
}

export function PatternAnalysis() {
  const detectedPatterns: Pattern[] = [
    {
      id: '1',
      name: 'Login Flow',
      confidence: 95,
      description: 'Standard email/password authentication pattern',
      elements: 3,
      actions: ['Input email', 'Input password', 'Click login', 'Verify success'],
      icon: <Target className="w-5 h-5" />,
      color: 'green'
    },
    {
      id: '2',
      name: 'Form Validation',
      confidence: 88,
      description: 'Input validation and error handling pattern',
      elements: 2,
      actions: ['Invalid input', 'Error message display', 'Field highlighting'],
      icon: <CheckCircle className="w-5 h-5" />,
      color: 'blue'
    },
    {
      id: '3',
      name: 'Navigation Flow',
      confidence: 92,
      description: 'Menu navigation and page transitions',
      elements: 4,
      actions: ['Menu tap', 'Page transition', 'Back navigation'],
      icon: <MousePointer className="w-5 h-5" />,
      color: 'purple'
    },
    {
      id: '4',
      name: 'Loading States',
      confidence: 85,
      description: 'Async operations and loading indicators',
      elements: 2,
      actions: ['Show loader', 'Wait for content', 'Hide loader'],
      icon: <Clock className="w-5 h-5" />,
      color: 'orange'
    }
  ]

  const getColorClasses = (color: string) => {
    const colors = {
      green: 'bg-green-50 border-green-200 text-green-900',
      blue: 'bg-blue-50 border-blue-200 text-blue-900',
      purple: 'bg-purple-50 border-purple-200 text-purple-900',
      orange: 'bg-orange-50 border-orange-200 text-orange-900'
    }
    return colors[color as keyof typeof colors] || colors.green
  }

  const getIconColor = (color: string) => {
    const colors = {
      green: 'text-green-600',
      blue: 'text-blue-600',
      purple: 'text-purple-600',
      orange: 'text-orange-600'
    }
    return colors[color as keyof typeof colors] || colors.green
  }

  return (
    <div className="space-y-6">
      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <Brain className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900">4</p>
                <p className="text-sm text-slate-600">Patterns Detected</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Target className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900">11</p>
                <p className="text-sm text-slate-600">Elements Mapped</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900">90%</p>
                <p className="text-sm text-slate-600">Avg Confidence</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                <Zap className="w-5 h-5 text-orange-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900">12</p>
                <p className="text-sm text-slate-600">Test Actions</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detected Patterns */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Brain className="w-5 h-5 text-purple-600" />
            <span>Detected Patterns</span>
          </CardTitle>
          <CardDescription>
            AI-identified user behavior patterns and test scenarios
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {detectedPatterns.map((pattern) => (
              <div
                key={pattern.id}
                className={`p-4 rounded-lg border ${getColorClasses(pattern.color)}`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3">
                    <div className={`w-10 h-10 bg-white rounded-lg flex items-center justify-center ${getIconColor(pattern.color)}`}>
                      {pattern.icon}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h4 className="font-semibold">{pattern.name}</h4>
                        <Badge variant="secondary" className="text-xs">
                          {pattern.elements} elements
                        </Badge>
                      </div>
                      <p className="text-sm mb-3">{pattern.description}</p>
                      <div className="flex flex-wrap gap-1">
                        {pattern.actions.map((action, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {action}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="text-sm font-medium">Confidence</span>
                      <Badge variant="secondary">{pattern.confidence}%</Badge>
                    </div>
                    <Progress value={pattern.confidence} className="w-20 h-2" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* AI Insights */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Eye className="w-5 h-5 text-blue-600" />
            <span>AI Insights</span>
          </CardTitle>
          <CardDescription>
            Intelligent recommendations for test optimization
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                <Zap className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="font-medium text-blue-900">Optimized Wait Strategy</p>
                <p className="text-sm text-blue-700">
                  AI detected optimal wait times for each element. Explicit waits added for dynamic content.
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3 p-3 bg-green-50 rounded-lg border border-green-200">
              <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0">
                <Target className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="font-medium text-green-900">Robust Element Locators</p>
                <p className="text-sm text-green-700">
                  Multiple fallback locators generated for each element to improve test stability.
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3 p-3 bg-purple-50 rounded-lg border border-purple-200">
              <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                <CheckCircle className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="font-medium text-purple-900">Error Handling</p>
                <p className="text-sm text-purple-700">
                  Automatic retry logic and error recovery patterns added based on app behavior.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}