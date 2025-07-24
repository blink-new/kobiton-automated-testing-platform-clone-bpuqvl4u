import React, { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { ScriptEditor } from '@/components/ScriptEditor'
import { PatternAnalysis } from '@/components/PatternAnalysis'
import { ScriptLibrary } from '@/components/ScriptLibrary'
import { FlutterAppRecorder } from '@/components/FlutterAppRecorder'
import { FlutterScriptGenerator } from '@/components/FlutterScriptGenerator'
import { 
  Play, 
  Square, 
  Download, 
  Eye, 
  Smartphone, 
  Brain, 
  Code, 
  CheckCircle,
  Clock,
  Zap,
  FileText,
  Settings,
  Circle,
  Pause,
  RotateCcw,
  Users,
  MessageCircle,
  Phone,
  Video
} from 'lucide-react'

function App() {
  const [isRecording, setIsRecording] = useState(false)
  const [analysisProgress, setAnalysisProgress] = useState(0)
  const [generatedScript, setGeneratedScript] = useState('')
  const [selectedLanguage, setSelectedLanguage] = useState('java')
  const [recordingTime, setRecordingTime] = useState(0)
  const [recordedActions, setRecordedActions] = useState<string[]>([])

  const generateScript = () => {
    setGeneratedScript('generated')
  }

  const startAnalysis = () => {
    // Simulate AI analysis progress
    let progress = 0
    const interval = setInterval(() => {
      progress += 8
      setAnalysisProgress(progress)
      if (progress >= 100) {
        clearInterval(interval)
        generateScript()
      }
    }, 150)
  }

  const startRecording = () => {
    setIsRecording(true)
    setRecordingTime(0)
    setRecordedActions([])
    
    // Simulate recording process with actions
    const actions = [
      'Tap on email field',
      'Enter email address',
      'Tap on password field', 
      'Enter password',
      'Tap login button',
      'Wait for navigation',
      'Verify welcome screen'
    ]
    
    let actionIndex = 0
    const recordingInterval = setInterval(() => {
      setRecordingTime(prev => prev + 1)
      
      if (actionIndex < actions.length && Math.random() > 0.7) {
        setRecordedActions(prev => [...prev, actions[actionIndex]])
        actionIndex++
      }
    }, 1000)
    
    // Stop recording after 5 seconds
    setTimeout(() => {
      setIsRecording(false)
      clearInterval(recordingInterval)
      startAnalysis()
    }, 5000)
  }

  const resetRecording = () => {
    setIsRecording(false)
    setAnalysisProgress(0)
    setGeneratedScript('')
    setRecordingTime(0)
    setRecordedActions([])
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-green-600 to-green-700 rounded-lg flex items-center justify-center">
                <Brain className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-semibold text-slate-900">AI Appium Generator</h1>
                <p className="text-sm text-slate-500">Flutter App Testing Platform</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="outline" className="text-green-700 border-green-200">
                <Zap className="w-3 h-3 mr-1" />
                AI Powered
              </Badge>
              <Badge variant="outline" className="text-blue-700 border-blue-200">
                <Code className="w-3 h-3 mr-1" />
                Flutter Ready
              </Badge>
              <Button variant="outline" size="sm">
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs defaultValue="flutter-recorder" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 lg:w-[800px]">
            <TabsTrigger value="flutter-recorder" className="flex items-center space-x-2">
              <Smartphone className="w-4 h-4" />
              <span>Flutter Recorder</span>
            </TabsTrigger>
            <TabsTrigger value="flutter-scripts" className="flex items-center space-x-2">
              <Code className="w-4 h-4" />
              <span>Flutter Scripts</span>
            </TabsTrigger>
            <TabsTrigger value="generator" className="flex items-center space-x-2">
              <Code className="w-4 h-4" />
              <span>Script Generator</span>
            </TabsTrigger>
            <TabsTrigger value="analysis" className="flex items-center space-x-2">
              <Brain className="w-4 h-4" />
              <span>Pattern Analysis</span>
            </TabsTrigger>
            <TabsTrigger value="library" className="flex items-center space-x-2">
              <FileText className="w-4 h-4" />
              <span>Script Library</span>
            </TabsTrigger>
          </TabsList>

          {/* Flutter App Recorder Tab */}
          <TabsContent value="flutter-recorder">
            <div className="space-y-6">
              {/* Microsoft Teams Flow Overview */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="w-5 h-5 text-blue-600" />
                    Microsoft Teams Flutter App Testing
                  </CardTitle>
                  <CardDescription>
                    Comprehensive test flow recording for Microsoft Teams including registration, messaging, and calling features
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                    <div className="text-center p-4 bg-blue-50 rounded-lg border border-blue-200">
                      <Users className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                      <p className="text-sm font-medium text-blue-900">User Registration</p>
                      <p className="text-xs text-blue-700">Signup & Profile</p>
                    </div>
                    <div className="text-center p-4 bg-green-50 rounded-lg border border-green-200">
                      <MessageCircle className="w-8 h-8 text-green-600 mx-auto mb-2" />
                      <p className="text-sm font-medium text-green-900">Send Messages</p>
                      <p className="text-xs text-green-700">1-to-1 Chat</p>
                    </div>
                    <div className="text-center p-4 bg-purple-50 rounded-lg border border-purple-200">
                      <Users className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                      <p className="text-sm font-medium text-purple-900">Group Messages</p>
                      <p className="text-xs text-purple-700">Team Chat</p>
                    </div>
                    <div className="text-center p-4 bg-orange-50 rounded-lg border border-orange-200">
                      <Phone className="w-8 h-8 text-orange-600 mx-auto mb-2" />
                      <p className="text-sm font-medium text-orange-900">Voice Call</p>
                      <p className="text-xs text-orange-700">1-to-1 Audio</p>
                    </div>
                    <div className="text-center p-4 bg-red-50 rounded-lg border border-red-200">
                      <Video className="w-8 h-8 text-red-600 mx-auto mb-2" />
                      <p className="text-sm font-medium text-red-900">Video Call</p>
                      <p className="text-xs text-red-700">1-to-1 Video</p>
                    </div>
                    <div className="text-center p-4 bg-indigo-50 rounded-lg border border-indigo-200">
                      <Video className="w-8 h-8 text-indigo-600 mx-auto mb-2" />
                      <p className="text-sm font-medium text-indigo-900">Group Calls</p>
                      <p className="text-xs text-indigo-700">Multi-party</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Flutter App Recorder Component */}
              <FlutterAppRecorder />
            </div>
          </TabsContent>

          {/* Flutter Scripts Tab */}
          <TabsContent value="flutter-scripts">
            <FlutterScriptGenerator />
          </TabsContent>

          {/* Script Generator Tab */}
          <TabsContent value="generator" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Recording Panel */}
              <Card className="lg:col-span-1">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Smartphone className="w-5 h-5 text-green-600" />
                    <span>App Recording</span>
                  </CardTitle>
                  <CardDescription>
                    Record your app interactions for AI analysis
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="aspect-[9/16] bg-slate-100 rounded-lg border-2 border-dashed border-slate-300 flex flex-col items-center justify-center p-4">
                    {isRecording ? (
                      <div className="text-center space-y-3 w-full">
                        <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center animate-pulse mx-auto">
                          <Circle className="w-4 h-4 bg-white rounded-full fill-current" />
                        </div>
                        <p className="text-sm font-medium text-slate-700">Recording... {recordingTime}s</p>
                        <div className="space-y-1 text-left">
                          {recordedActions.map((action, index) => (
                            <div key={index} className="text-xs text-slate-600 bg-white p-2 rounded border">
                              {action}
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <div className="text-center space-y-3">
                        <Smartphone className="w-12 h-12 text-slate-400 mx-auto" />
                        <p className="text-sm font-medium text-slate-700">Device Simulator</p>
                        <p className="text-xs text-slate-500">Connect your app to start recording</p>
                      </div>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex space-x-2">
                      <Button 
                        onClick={startRecording} 
                        disabled={isRecording || analysisProgress > 0}
                        className="flex-1 bg-green-600 hover:bg-green-700"
                      >
                        {isRecording ? (
                          <>
                            <Square className="w-4 h-4 mr-2" />
                            Recording...
                          </>
                        ) : (
                          <>
                            <Play className="w-4 h-4 mr-2" />
                            Start Recording
                          </>
                        )}
                      </Button>
                      <Button 
                        variant="outline"
                        onClick={resetRecording}
                        disabled={isRecording}
                      >
                        <RotateCcw className="w-4 h-4" />
                      </Button>
                    </div>
                    
                    {analysisProgress > 0 && analysisProgress < 100 && (
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-slate-600">AI Analysis</span>
                          <span className="text-slate-600">{analysisProgress}%</span>
                        </div>
                        <Progress value={analysisProgress} className="h-2" />
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Generated Script Panel */}
              <div className="lg:col-span-2">
                {generatedScript ? (
                  <ScriptEditor 
                    script={generatedScript}
                    language={selectedLanguage}
                    onLanguageChange={setSelectedLanguage}
                  />
                ) : (
                  <Card className="h-full">
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <Code className="w-5 h-5 text-blue-600" />
                        <span>Generated Appium Script</span>
                      </CardTitle>
                      <CardDescription>
                        AI-generated test script based on recorded patterns
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="h-64 bg-slate-50 rounded-lg border-2 border-dashed border-slate-300 flex items-center justify-center">
                        <div className="text-center space-y-3">
                          <Code className="w-12 h-12 text-slate-400 mx-auto" />
                          <p className="text-sm font-medium text-slate-700">No script generated yet</p>
                          <p className="text-xs text-slate-500">Start recording to generate Appium scripts</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>

            {/* AI Insights Panel */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Brain className="w-5 h-5 text-purple-600" />
                  <span>AI Pattern Recognition</span>
                </CardTitle>
                <CardDescription>
                  Intelligent analysis of user behavior patterns
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-gradient-to-r from-green-50 to-green-100 p-4 rounded-lg border border-green-200">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center">
                        <CheckCircle className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="font-medium text-green-900">Login Flow</p>
                        <p className="text-sm text-green-700">Pattern detected</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-4 rounded-lg border border-blue-200">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                        <Clock className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="font-medium text-blue-900">Wait Conditions</p>
                        <p className="text-sm text-blue-700">Auto-optimized</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-r from-purple-50 to-purple-100 p-4 rounded-lg border border-purple-200">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center">
                        <Zap className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="font-medium text-purple-900">Element Locators</p>
                        <p className="text-sm text-purple-700">AI-optimized</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Pattern Analysis Tab */}
          <TabsContent value="analysis">
            <PatternAnalysis />
          </TabsContent>

          {/* Script Library Tab */}
          <TabsContent value="library">
            <ScriptLibrary />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}

export default App