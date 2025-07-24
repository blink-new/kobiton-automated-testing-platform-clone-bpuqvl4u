import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { 
  FileText, 
  Search, 
  Download, 
  Eye, 
  Trash2, 
  Copy,
  Calendar,
  Code,
  Play,
  Star
} from 'lucide-react'

interface Script {
  id: string
  name: string
  description: string
  language: string
  createdAt: string
  lastModified: string
  size: string
  confidence: number
  patterns: string[]
  status: 'generated' | 'validated' | 'failed'
}

export function ScriptLibrary() {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterLanguage, setFilterLanguage] = useState('all')
  const [filterStatus, setFilterStatus] = useState('all')

  const scripts: Script[] = [
    {
      id: '1',
      name: 'Login Flow Test',
      description: 'Automated login test with email and password validation',
      language: 'java',
      createdAt: '2024-01-20',
      lastModified: '2024-01-20',
      size: '2.3 KB',
      confidence: 95,
      patterns: ['Login Flow', 'Form Validation'],
      status: 'validated'
    },
    {
      id: '2',
      name: 'Navigation Test Suite',
      description: 'Complete navigation flow testing across app screens',
      language: 'python',
      createdAt: '2024-01-19',
      lastModified: '2024-01-19',
      size: '4.1 KB',
      confidence: 92,
      patterns: ['Navigation Flow', 'Menu Interaction'],
      status: 'generated'
    },
    {
      id: '3',
      name: 'Form Submission Test',
      description: 'Multi-step form submission with validation checks',
      language: 'javascript',
      createdAt: '2024-01-18',
      lastModified: '2024-01-18',
      size: '3.7 KB',
      confidence: 88,
      patterns: ['Form Validation', 'Error Handling'],
      status: 'validated'
    },
    {
      id: '4',
      name: 'Search Functionality',
      description: 'Search feature testing with various input scenarios',
      language: 'java',
      createdAt: '2024-01-17',
      lastModified: '2024-01-17',
      size: '1.9 KB',
      confidence: 85,
      patterns: ['Search Flow', 'Loading States'],
      status: 'failed'
    }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'validated':
        return 'bg-green-100 text-green-800 border-green-200'
      case 'generated':
        return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'failed':
        return 'bg-red-100 text-red-800 border-red-200'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getLanguageColor = (language: string) => {
    switch (language) {
      case 'java':
        return 'bg-orange-100 text-orange-800 border-orange-200'
      case 'python':
        return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'javascript':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const filteredScripts = scripts.filter(script => {
    const matchesSearch = script.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         script.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesLanguage = filterLanguage === 'all' || script.language === filterLanguage
    const matchesStatus = filterStatus === 'all' || script.status === filterStatus
    
    return matchesSearch && matchesLanguage && matchesStatus
  })

  return (
    <div className="space-y-6">
      {/* Header and Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <FileText className="w-5 h-5 text-blue-600" />
            <span>Script Library</span>
          </CardTitle>
          <CardDescription>
            Manage and organize your generated Appium test scripts
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search scripts..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={filterLanguage} onValueChange={setFilterLanguage}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Language" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Languages</SelectItem>
                <SelectItem value="java">Java</SelectItem>
                <SelectItem value="python">Python</SelectItem>
                <SelectItem value="javascript">JavaScript</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="validated">Validated</SelectItem>
                <SelectItem value="generated">Generated</SelectItem>
                <SelectItem value="failed">Failed</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Scripts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredScripts.map((script) => (
          <Card key={script.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <CardTitle className="text-lg">{script.name}</CardTitle>
                  <CardDescription className="mt-1">
                    {script.description}
                  </CardDescription>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge className={getStatusColor(script.status)}>
                    {script.status}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Script Metadata */}
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center space-x-2">
                  <Code className="w-4 h-4 text-gray-500" />
                  <span className="text-gray-600">Language:</span>
                  <Badge className={getLanguageColor(script.language)}>
                    {script.language}
                  </Badge>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4 text-gray-500" />
                  <span className="text-gray-600">Created:</span>
                  <span>{script.createdAt}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <FileText className="w-4 h-4 text-gray-500" />
                  <span className="text-gray-600">Size:</span>
                  <span>{script.size}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Star className="w-4 h-4 text-gray-500" />
                  <span className="text-gray-600">Confidence:</span>
                  <span>{script.confidence}%</span>
                </div>
              </div>

              {/* Patterns */}
              <div>
                <p className="text-sm text-gray-600 mb-2">Detected Patterns:</p>
                <div className="flex flex-wrap gap-1">
                  {script.patterns.map((pattern, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {pattern}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex justify-between items-center pt-2 border-t">
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">
                    <Eye className="w-4 h-4 mr-2" />
                    View
                  </Button>
                  <Button variant="outline" size="sm">
                    <Copy className="w-4 h-4 mr-2" />
                    Copy
                  </Button>
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">
                    <Play className="w-4 h-4 mr-2" />
                    Run
                  </Button>
                  <Button variant="outline" size="sm">
                    <Download className="w-4 h-4 mr-2" />
                    Export
                  </Button>
                  <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {filteredScripts.length === 0 && (
        <Card>
          <CardContent className="py-12">
            <div className="text-center space-y-3">
              <FileText className="w-12 h-12 text-gray-400 mx-auto" />
              <p className="text-lg font-medium text-gray-900">No scripts found</p>
              <p className="text-gray-500">
                {searchTerm || filterLanguage !== 'all' || filterStatus !== 'all'
                  ? 'Try adjusting your search or filters'
                  : 'Generate your first Appium script to get started'}
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Summary Stats */}
      <Card>
        <CardContent className="py-4">
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-center">
            <div>
              <p className="text-2xl font-bold text-blue-600">{scripts.length}</p>
              <p className="text-sm text-gray-600">Total Scripts</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-green-600">
                {scripts.filter(s => s.status === 'validated').length}
              </p>
              <p className="text-sm text-gray-600">Validated</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-orange-600">
                {Math.round(scripts.reduce((acc, s) => acc + s.confidence, 0) / scripts.length)}%
              </p>
              <p className="text-sm text-gray-600">Avg Confidence</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-purple-600">
                {scripts.reduce((acc, s) => acc + s.patterns.length, 0)}
              </p>
              <p className="text-sm text-gray-600">Total Patterns</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}